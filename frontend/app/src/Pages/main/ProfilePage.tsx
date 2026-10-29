import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useEffect } from "react";
import ProfileNavigationBar from "../../Components/ui/ProfileNavigationBar";

export default function ProfilePage() {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const onClickLogout = async () => {
    const result = await logout();
    if (result.success) navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div>
      <h2>Welcome back, {user?.first_name}</h2>
      <p></p>
      <button onClick={() => navigate("/")}>Home</button>
      <p></p>
      <button onClick={onClickLogout}>Log out</button>
      <ProfileNavigationBar />
      <Outlet />
    </div>
  );
}
