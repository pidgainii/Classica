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
    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 py-4 max-w-5xl mx-auto">
      <h3>Current genres: {genres}</h3>
      <h3>Current languages: {languages}</h3>

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
      <button onClick={onClickApplyFilters}>Apply Filters</button>
      <button onClick={onClickClearFilters}>Clear Filters</button>
      <SearchBar setSearchQuery={setSearchQuery}></SearchBar>
    </div>
  );
}
