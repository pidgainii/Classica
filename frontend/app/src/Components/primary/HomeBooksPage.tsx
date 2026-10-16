import { useEffect, useState } from "react";
import CategoryNavigation from "../secondary/CategoryNavigation";
import BookDisplay from "../secondary/BookDisplay";
import OrderFiltersNavigation from "../secondary/OrderFiltersNavigation";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../Utils/localStorageUtils";
import type { BookQueryFilters } from "../../Models/queryFilters";
import { SORT_BY_OPTIONS } from "../../Utils/Constants";

export default function HomeBooksPage() {
  const [page, setPage] = useState<number>(getLocalStorageItem("page") || 1);

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

  const triggerNewQuery = (filters: BookQueryFilters) => {
    setSearchQuery(filters.searchQuery);
    setSortBy(filters.sortBy);
    setGenres(filters.genres);
    setLanguages(filters.languages);

    setPage(1);

    setLocalStorageItem("searchQuery", filters.searchQuery);
    setLocalStorageItem("sortBy", filters.sortBy);
    setLocalStorageItem("genres", filters.genres);
    setLocalStorageItem("languages", filters.languages);
  };

  useEffect(() => {
    setLocalStorageItem("page", page);
  }, [page]);

  return (
    <div>
      <OrderFiltersNavigation triggerNewQuery={triggerNewQuery} />
      <CategoryNavigation triggerNewQuery={triggerNewQuery} />
      <BookDisplay
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        sortBy={sortBy}
        genres={genres}
        languages={languages}
      />
    </div>
  );
}
