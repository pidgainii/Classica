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
    <div className="relative w-full sm:w-[280px]">
      <input
        type="text"
        placeholder="Search books..."
        className="w-full bg-white border border-[#d6ccb8] px-3 py-2 pl-8 pr-8 text-xs text-[#5a4a42] placeholder-[#a69b90] outline-none focus:border-[#5a4a42] rounded-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#a69b90] pointer-events-none" />
      <button
        onClick={onClickSearchButton}
        className="absolute right-2.5 top-2.5"
      >
        <Search className="w-3.5 h-3.5 text-[#a69b90] cursor-pointer hover:text-[#5a4a42]" />
      </button>
    </div>
  );
}
