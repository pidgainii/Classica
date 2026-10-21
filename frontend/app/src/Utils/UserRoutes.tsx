import { useAuthContext } from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router";

export default function UserRoutes() {
  const { user, loading } = useAuthContext();

  if (loading == true || loading === undefined || user === undefined)
    return <h1>Loading</h1>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
