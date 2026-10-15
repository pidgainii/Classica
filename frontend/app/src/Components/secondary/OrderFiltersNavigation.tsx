import { useState } from "react";
import SelectionElement from "../ui/SelectionElement";

interface OrderFiltersNavigationProps {
  availableGenres: string[];
  setGenres: (genres: string[]) => void;
  availableLanguages: string[];
  setLanguages: (elements: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export default function OrderFiltersNavigation(
  props: OrderFiltersNavigationProps,
) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const onClickApplyFilters = () => {
    props.setGenres(selectedGenres);
    props.setLanguages(selectedLanguages);

    props.setPage(1);
  };

  const onClickClearFilters = () => {
    setSelectedGenres([]);
    props.setGenres([]);
    setSelectedLanguages([]);
    props.setLanguages([]);

    props.setPage(1);
  };

  return (
    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 py-4 max-w-5xl mx-auto">
      <h3>Current genres: {selectedGenres}</h3>
      <h3>Current languages: {selectedLanguages}</h3>

      <SelectionElement
        title={"Genres"}
        availableElements={props.availableGenres}
        setElements={setSelectedGenres}
      />
      <SelectionElement
        title="Languages"
        availableElements={props.availableLanguages}
        setElements={setSelectedLanguages}
      />
      <button onClick={onClickApplyFilters}>Apply Filters</button>
      <button onClick={onClickClearFilters}>Clear Filters</button>
      <input
        type="search"
        className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
        placeholder="Search"
        value={props.searchQuery}
        onChange={(e) => props.setSearchQuery(e.target.value)}
      ></input>
    </div>
  );
}
