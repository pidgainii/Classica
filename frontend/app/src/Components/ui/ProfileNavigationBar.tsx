import { Link, useLocation } from "react-router";

export default function ProfileNavigationBar() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full max-w-4xl mx-auto mt-8 border-t border-b border-gray-200 py-3 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm tracking-widest uppercase text-gray-500">
      <Link to="/profile">
        <a
          className={
            pathname == "/profile"
              ? "text-black"
              : "hover:text-gray-800 transition-colors"
          }
        >
          Profile
        </a>
      </Link>
      <Link to="/profile/my-library">
        <a
          className={
            pathname == "/profile/my-library"
              ? "text-black"
              : "hover:text-gray-800 transition-colors"
          }
        >
          My Library
        </a>
      </Link>
      <Link to="/profile/my-posts">
        <a
          className={
            pathname == "/profile/my-posts"
              ? "text-black"
              : "hover:text-gray-800 transition-colors"
          }
        >
          My Posts
        </a>
      </Link>
      <Link to="/profile/settings">
        <a
          className={
            pathname == "/profile/settings"
              ? "text-black"
              : "hover:text-gray-800 transition-colors"
          }
        >
          Settings
        </a>
      </Link>
    </nav>
  );
}
