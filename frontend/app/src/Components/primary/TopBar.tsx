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
    <div className="bg-[#f0ece1] text-[#5a4a42] text-xs py-2.5 px-8 w-full flex justify-between items-center border-b border-[#e6decb]">
      {/* Smaller logo on the left */}
      <div
        onClick={() => navigate("/books")}
        className="font-serif tracking-[0.2em] text-sm font-normal cursor-pointer uppercase text-[#4a3b32]"
      >
        Classica
      </div>
      <div className="flex items-center space-x-2 tracking-wider">
        <button
          onClick={onClickUserButton}
          className="flex items-center space-x-1.5 hover:text-black transition-colors focus:outline-none"
        >
          <UserCircleIcon className="w-4 h-4" />
          <span className="font-sans text-xs">
            {user ? user.first_name : "Log in"}
          </span>
        </button>
      </div>
    </div>
  );
}
