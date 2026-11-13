import { Link, useLocation } from "react-router";

export default function ProfileNavigationBar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full border-t border-b border-[#e6decb] py-3 flex justify-center flex-wrap gap-x-8 gap-y-2 text-xs font-sans tracking-[0.2em] uppercase text-[#7a6b63] bg-[#f0ece1]">
      <Link
        to="/profile"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/profile"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        Profile
      </Link>
      <Link
        to="/profile/my-library"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/profile/my-library"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        My Library
      </Link>
      <Link
        to="/profile/my-posts"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/profile/my-posts"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        My Posts
      </Link>
      <Link
        to="/profile/settings"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/profile/settings" ||
          pathname === "/profile/settings/delete-account"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        Settings
      </Link>
    </nav>
  );
}
