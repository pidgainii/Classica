import { useAuthContext } from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router";

export default function NoUserRoutes() {
  const { user } = useAuthContext();

  return user ? <Navigate to="/profile" /> : <Outlet />;
}
