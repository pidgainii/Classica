import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { UserType, UserLoginType } from "../Models/user";
import type { Response } from "../Models/result";

import api from "../Services/api/api";

import {
  currentUserRequest,
  loginRequest,
  logoutRequest,
} from "../Services/api/service";

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  error: any | null;
  accessToken: string | null;
  login: (user: UserLoginType) => Promise<Response>;
  logout: () => Promise<Response>;
}

// The default value will be undefined. Therefore if we useContext(AuthContext) and get undefined
// We will know that we are using it outside the AuthContext.Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Auth Provider component
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // This layout effect is supposed to execute every time accessToken changes it's value.
  // It is supposed to add an interceptor for http requests that will add the access token to Authorization header.
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  // This layout effect will add a response interceptor. On failed responses due to authorization problem
  // the interceptor will try to get a new access token from the backend.
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      // If the response is normal, then ok
      (response) => response,
      // If the response has error, then:
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized" &&
          !originalRequest._retry
        ) {
          try {
            const response = await api.get("/auth/refresh");
            setAccessToken(response.data.access_token);

            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setAccessToken(null);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  // This useEffect will load the user context variable on every render
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const currentUser = await currentUserRequest();
        setUser(currentUser);
        setLoading(false);
      } catch {
        setUser(null);
        setError(true);
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  async function login(user: UserLoginType) {
    setLoading(true);

    try {
      const data = await loginRequest(user);
      setAccessToken(data.access_token);
      setLoading(false);
      const response: Response = { success: true };
      return response;
    } catch (error: any) {
      setError(error);
      setLoading(false);
      const response: Response = { success: false };
      return response;
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await logoutRequest();
      setUser(null);
      setAccessToken(null);
      setLoading(false);
      const response: Response = { success: true };
      return response;
    } catch (error: any) {
      setError(error);
      setLoading(false);
      const response: Response = { success: false };
      return response;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
export function useAuthContext() {
  // If this hook is called outside the AuthProvider, the context will be undefined (default value)
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuthContext must be used inside AuthProvider!!!");
  }

  const { user, loading, error, accessToken, login, logout } = authContext;
  return { user, loading, error, accessToken, login, logout };
}
