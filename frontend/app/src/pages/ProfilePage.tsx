import { useNavigate } from "react-router";
import { useAuthContext } from "../Contexts/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const onClickLogout = async () => {
    const result = await logout();
    if (result.success) navigate("/");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Email: {user?.email}</h2>
      <h2>First name: {user?.first_name}</h2>
      <h2>Last name: {user?.last_name}</h2>
      <p></p>
      <button onClick={onClickLogout}>Log out</button>
    </div>
  );
}
