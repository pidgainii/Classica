import { Search, UserCircleIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Contexts/AuthContext";

export default function TopBar() {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const onClickUserButton = () => {
    if (user) navigate("/profile");
    else navigate("/login");
  };

  return (
    <div className="bg-[#2a2a2a] text-gray-300 text-xs py-2 px-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="tracking-wide">Classica</div>
      <div className="flex items-center space-x-4 mt-2 sm:mt-0 uppercase tracking-wider">
        <Search></Search>
        <input
          type="search"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Search"
        ></input>
        <button onClick={onClickUserButton}>
          <UserCircleIcon />
          <div>{user ? user.first_name : "Log in"}</div>
        </button>
      </div>
    </div>
  );
}
