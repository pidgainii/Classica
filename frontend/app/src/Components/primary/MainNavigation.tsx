import { Link, useLocation } from "react-router";

export default function MainNavigation() {
  const { pathname } = useLocation();
  return (
    <nav className="w-full max-w-4xl mx-auto mt-8 border-t border-b border-gray-200 py-3 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm tracking-widest uppercase text-gray-500">
      <Link to="/books">
        <a
          className={
            pathname == "/books"
              ? "text-black"
              : "hover:text-gray-800 transition-colors"
          }
        >
          BOOKS
        </a>
      </Link>
      <Link to="/blog">
        <a
          className={
            pathname == "/blog"
              ? "text-black"
              : "hover:text-gray-800 transition-colors"
          }
        >
          BLOG
        </a>
      </Link>
    </nav>
  );
}
