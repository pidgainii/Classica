import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "../../Utils/localStorageUtils";

interface SearchBarProps {
  setSearchQuery: (searchQuery: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>(
    getLocalStorageItem("searchQuery") || "",
  );

  useEffect(() => {
    if (searchTerm.length == 0 || searchTerm.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        props.setSearchQuery(searchTerm);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const onClickSearchButton = () => {
    props.setSearchQuery(searchTerm);
  };

  return (
    <div className="flex-1 flex justify-center md:justify-end">
      <div className="relative w-full max-w-[200px]">
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-1.5 pr-8 text-sm outline-none focus:border-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={onClickSearchButton}>
          <Search className="absolute right-2 top-1.5 w-4 h-4 text-gray-400 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
