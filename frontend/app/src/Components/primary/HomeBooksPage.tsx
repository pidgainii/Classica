import { useEffect, useState } from "react";
import CategoryNavigation from "../secondary/CategoryNavigation";
import BookDisplay from "../secondary/BookDisplay";
import OrderFiltersNavigation from "../secondary/OrderFiltersNavigation";
import { GENRES, LANGUAGES } from "../../Utils/Constants";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../Utils/localStorageUtils";

export default function HomeBooksPage() {
  const [page, setPage] = useState<number>(getLocalStorageItem("page") || 1);

  const [searchQuery, setSearchQuery] = useState<string>(
    getLocalStorageItem("searchQuery") || "",
  );
  const [sortBy, setSortBy] = useState<"random" | "rating">("random");
  const [ascending, setAscending] = useState<boolean>(true);
  const [genres, setGenres] = useState<string[]>(
    getLocalStorageItem("genres") || [],
  );
  const [languages, setLanguages] = useState<string[]>(
    getLocalStorageItem("languages") || [],
  );

  useEffect(() => {
    setLocalStorageItem("genres", genres);
  }, [genres]);

  useEffect(() => {
    setLocalStorageItem("languages", languages);
  }, [languages]);

  useEffect(() => {
    setLocalStorageItem("page", page);
  }, [page]);

  useEffect(() => {
    setLocalStorageItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <OrderFiltersNavigation
        availableGenres={GENRES}
        setGenres={setGenres}
        availableLanguages={LANGUAGES}
        setLanguages={setLanguages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <CategoryNavigation />
      <BookDisplay
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        sortBy={sortBy}
        ascending={ascending}
        genres={genres}
        languages={languages}
      />
    </div>
  );
}
