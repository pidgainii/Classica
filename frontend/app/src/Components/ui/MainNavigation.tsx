export default function MainNavigation() {
  return (
    <nav className="w-full max-w-4xl mx-auto mt-8 border-t border-b border-gray-200 py-3 flex justify-center flex-wrap gap-x-8 gap-y-2 text-sm tracking-widest uppercase text-gray-500">
      <a href="#" className="text-gray-800 font-medium">
        BOOKS
      </a>
      <a href="#" className="hover:text-gray-800 transition-colors">
        TEXTBOOKS
      </a>
      <a href="#" className="hover:text-gray-800 transition-colors">
        NOOK BOOKS
      </a>
      <a href="#" className="hover:text-gray-800 transition-colors">
        AUDIOBOOKS
      </a>
      <a href="#" className="hover:text-gray-800 transition-colors">
        MAGAZINES
      </a>
    </nav>
  );
}
