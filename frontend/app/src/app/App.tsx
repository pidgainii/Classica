import { Outlet } from "react-router";
import { AuthProvider } from "../Contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
