import { useAuthContext } from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router";

export default function NoUserRoutes() {
  const { user, loading } = useAuthContext();

  if (loading == true || loading === undefined || user === undefined)
    return <h1>Loading</h1>;
  return user ? <Navigate to="/profile" replace /> : <Outlet />;
}
