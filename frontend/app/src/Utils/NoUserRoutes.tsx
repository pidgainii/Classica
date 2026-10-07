import { useAuthContext } from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router";
import Loading from "./Loading";

export default function NoUserRoutes() {
  const { user, loading } = useAuthContext();

  if (loading) return <Loading />;
  return user ? <Navigate to="/profile" /> : <Outlet />;
}
