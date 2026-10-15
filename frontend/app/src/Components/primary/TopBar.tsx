import { UserCircleIcon } from "lucide-react";
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
        <button onClick={onClickUserButton}>
          <UserCircleIcon />
          <div>{user ? user.first_name : "Log in"}</div>
        </button>
      </div>
    </div>
  );
}
