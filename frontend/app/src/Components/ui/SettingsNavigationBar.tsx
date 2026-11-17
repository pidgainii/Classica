import { Link, useLocation } from "react-router";

export default function SettingsNavigationBar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full border-b border-[#e6decb] py-3 flex justify-center flex-wrap gap-x-8 gap-y-2 text-xs font-sans tracking-[0.2em] uppercase text-[#7a6b63]">
      <Link
        to="/profile/settings"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/profile/settings"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        General
      </Link>
      <Link
        to="/profile/settings/delete-account"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/profile/settings/delete-account"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        Delete Account
      </Link>
    </nav>
  );
}
