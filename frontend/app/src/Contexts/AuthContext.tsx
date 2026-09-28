import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { User, UserLogin } from "../Models/user";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (user: UserLogin) => void;
  logout: () => void;
}

// The default value will be undefined. Therefore if we useContext(AuthContext) and get undefined
// We will know that we are using it outside the AuthContext.Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Auth Provider component
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  /*
  Here we should make some useEffects in order to fetch accessToken
  and to fetch current user. Although this shouldn't be done in every refresh I think

  Also we should create login and logout functions
  */
  async function login(user: UserLogin) {
    setLoading(true);

    if (user.email == "pepito@gmail.com" && user.password == "1234") {
      const user: User = {
        id: "1234",
        email: "pepito@gmail.com",
        first_name: "Pepito",
        last_name: "García",
      };
      setUser(user);

      setError(false);
      setLoading(false);
    }
  }
  async function logout() {
    setUser(undefined);
  }

  // TODO: Check useMemo for returning these values
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
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

  const { user, loading, error, login, logout } = authContext;
  return { user, loading, error, login, logout };
}
