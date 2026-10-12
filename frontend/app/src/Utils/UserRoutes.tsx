import { useAuthContext } from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router";

export default function UserRoutes() {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
}
