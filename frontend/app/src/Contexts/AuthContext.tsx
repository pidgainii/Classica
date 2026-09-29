import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User, UserLogin } from "../Models/user";

import api from "../Services/api/api";

import { currentUserRequest, loginRequest } from "../Services/api/service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: any | null;
  accessToken: string | null;
  login: (user: UserLogin) => void;
  logout: () => void;
}

// The default value will be undefined. Therefore if we useContext(AuthContext) and get undefined
// We will know that we are using it outside the AuthContext.Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Auth Provider component
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // TAKING THIS CODE OUT OF LAYOUT EFFECT IN ORDER TO BE ABLE TO CALL IT FROM LOGIN FUNCTION
  const updateRequestInterceptor = () => {
    /////////////// debugging /////////////////////
    console.log("Access token has changed, running useLayoutEffect");

    const authInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  };

  // This layout effect is supposed to execute every time accessToken changes it's value
  // It is supposed to add an interceptor for http requests that will add the access token to Authorization header
  useLayoutEffect(() => {
    updateRequestInterceptor();
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      // If the response is normal, then ok
      (response) => response,
      // If the response has error, then:
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized" &&
          !originalRequest._retry
        ) {
          try {
            const response = await api.get("/auth/refresh");
            setAccessToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
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

  async function login(user: UserLogin) {
    setLoading(true);

    try {
      /////////////// debugging /////////////////////
      console.log("Attempting login...");

      const newAccessToken = await loginRequest(user);

      /////////////// debugging /////////////////////
      console.log("Access token is " + newAccessToken);

      setAccessToken(newAccessToken);

      // PROBLEM FOUND: AFTER CHANGING ACCESS TOKEN, LAYOUT EFFECT FOR SOME REASON RUNS
      // AFTER THE next intruction -> await currentUserRequest().
      // IT SHOULD RUN BEFORE, TO ATTACH A NEW INTERCEPTOR WITH THE NEW ACCESS TOKEN

      // LETS TRY TO SOLVE IT WITH THIS
      updateRequestInterceptor();
      //STILL DOESNT WORK, THE LAYOUT EFFECT IS THEN BEING RUN. THIS MEANS THE ACCESS TOKEN STATE TAKES A WHILE TO UPDATE

      /////////////// debugging /////////////////////
      console.log("Getting current user...");
      const currentUser = await currentUserRequest();

      /////////////// debugging /////////////////////
      console.log("Current user is " + currentUser);
      setUser(currentUser);

      setLoading(false);
    } catch {
      setError(true);

      /////////////// debugging /////////////////////
      console.log("Something went wrong while logging in...");

      setLoading(false);
    }
  }
  async function logout() {
    setUser(null);
  }

  // TODO: Check useMemo for returning these values
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
