import { useEffect, useState } from "react";
import SearchBar from "../ui/SearchBar";
import { getLocalStorageItem } from "../../Utils/localStorageUtils";
import { GENRES, LANGUAGES, SORT_BY_OPTIONS } from "../../Utils/Constants";
import type { BookQueryFilters } from "../../Models/queryFilters";
import MultipleSelectionElement from "../ui/MultipleSelectionElement";
import SelectionElement from "../ui/SelectionElement";

interface OrderFiltersNavigationProps {
  triggerNewQuery: (filters: BookQueryFilters) => void;
}

export default function OrderFiltersNavigation(
  props: OrderFiltersNavigationProps,
) {
  const [searchQuery, setSearchQuery] = useState<string>(
    getLocalStorageItem("searchQuery") || "",
  );
  const [sortBy, setSortBy] = useState<string>(
    getLocalStorageItem("sortBy") || SORT_BY_OPTIONS[0],
  );
  const [genres, setGenres] = useState<string[]>(
    getLocalStorageItem("genres") || [],
  );
  const [languages, setLanguages] = useState<string[]>(
    getLocalStorageItem("languages") || [],
  );

  const onClickApplyFilters = () => {
    props.triggerNewQuery({
      searchQuery,
      sortBy,
      genres,
      languages,
    });
  };

  const onClickClearFilters = () => {
    setSearchQuery("");
    setSortBy(SORT_BY_OPTIONS[0]);
    setGenres([]);
    setLanguages([]);

    props.triggerNewQuery({
      searchQuery: "",
      sortBy: SORT_BY_OPTIONS[0],
      genres: [],
      languages: [],
    });
  };

  useEffect(() => {
    if (getLocalStorageItem("searchQuery") != searchQuery) {
      props.triggerNewQuery({
        searchQuery,
        sortBy,
        genres,
        languages,
      });
    }
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#f7f4ec] py-4 px-8 border-b border-[#e6decb]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 text-xs text-[#5a4a42]">
        <SearchBar setSearchQuery={setSearchQuery} />

        <SelectionElement
          title={"Sort By"}
          availableElements={SORT_BY_OPTIONS}
          currentElement={sortBy}
          setElement={setSortBy}
        />

        <MultipleSelectionElement
          title={"Genres"}
          availableElements={GENRES}
          currentElements={genres}
          setElements={setGenres}
        />

        <MultipleSelectionElement
          title="Languages"
          availableElements={LANGUAGES}
          currentElements={languages}
          setElements={setLanguages}
        />

        <button
          onClick={onClickApplyFilters}
          className="bg-[#5a4a42] text-[#f7f4ec] px-6 py-2 rounded-sm text-xs tracking-wider uppercase hover:bg-[#4a3b32] transition-colors"
        >
          Apply
        </button>

        <button
          onClick={onClickClearFilters}
          className="text-[#5a4a42] hover:text-black tracking-wider uppercase underline text-xs"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
