import { useAuthContext } from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router";
import Loading from "./Loading";

export default function UserRoutes() {
  const { user, loading } = useAuthContext();

  if (loading) return <Loading />;
  return user ? <Outlet /> : <Navigate to="/login" />;
}
