import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../Contexts/AuthContext";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const onClickLogout = async () => {
    const result = await logout();
    if (result.success) navigate("/");
  };

  const onClickFavourites = () => {
    navigate("/profile/favourites");
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div>
      <h2>Welcome back, {user?.first_name}</h2>
      <p></p>
      <button
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        onClick={onClickLogout}
      >
        Log out
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={onClickFavourites}
      >
        Favourite Books
      </button>

      <Outlet />
    </div>
  );
}
