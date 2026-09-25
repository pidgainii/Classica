import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex-1 flex justify-center md:justify-end">
      <div className="relative w-full max-w-[200px]">
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-1.5 pr-8 text-sm outline-none focus:border-gray-400"
        />
        <Search className="absolute right-2 top-1.5 w-4 h-4 text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
}
