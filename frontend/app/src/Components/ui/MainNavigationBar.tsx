import { Link, useLocation } from "react-router";

export default function MainNavigationBar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full mt-4 pb-2 flex justify-center items-center gap-x-12 text-xs tracking-[0.2em] uppercase font-sans font-medium text-[#7a6b63]">
      <Link
        to="/books"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/books" || pathname === "/"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        Books
      </Link>
      <Link
        to="/blog"
        className={`pb-1 border-b-2 transition-all ${
          pathname === "/blog"
            ? "border-[#4a3b32] text-[#3e322c] font-semibold"
            : "border-transparent hover:text-[#3e322c]"
        }`}
      >
        Blog
      </Link>
    </nav>
  );
}
