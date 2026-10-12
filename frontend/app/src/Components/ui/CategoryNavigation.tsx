export default function CategoryNavigation() {
  return (
    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 py-4 max-w-5xl mx-auto">
      <a href="#" className="hover:text-gray-600 hover:underline">
        Biographies & Memoirs
      </a>
      <a href="#" className="hover:text-gray-600 hover:underline">
        Children's Books
      </a>
      <a href="#" className="hover:text-gray-600 hover:underline">
        Christian Books
      </a>
      <a href="#" className="hover:text-gray-600 hover:underline">
        Poetry
      </a>
    </div>
  );
}
