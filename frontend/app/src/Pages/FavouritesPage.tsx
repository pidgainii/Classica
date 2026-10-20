import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../Contexts/AuthContext";
import { favouriteBooksRequest } from "../Services/api/service";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "../Utils/localStorageUtils";
import { BOOKS_PER_PAGE, SORT_BY_OPTIONS } from "../Utils/Constants";
import BookGrid from "../Components/ui/BookGrid";

export default function FavouritesPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const [page, setPage] = useState<number>(
    getLocalStorageItem("favourites_page") || 1,
  );

  // We actually only send the page number. There are no genres, search queries etc in favourites
  const {
    data: paginatedBooks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["favourite_books", user?.email, page],
    queryFn: () =>
      favouriteBooksRequest({
        page: page,
        perPage: BOOKS_PER_PAGE,
        searchQuery: "",
        sortBy: SORT_BY_OPTIONS[0],
        genres: [],
        languages: [],
      }),
  });

  // Prefetching the next page
  useEffect(() => {
    if (paginatedBooks && page < paginatedBooks.pages) {
      queryClient
        .query({
          queryKey: ["favourite_books", user?.email, page + 1],
          queryFn: () =>
            favouriteBooksRequest({
              page: page + 1,
              perPage: BOOKS_PER_PAGE,
              searchQuery: "",
              sortBy: SORT_BY_OPTIONS[0],
              genres: [],
              languages: [],
            }),
        })
        .catch(noop);
    }
  }, [paginatedBooks, page, queryClient]);

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <BookGrid page={page} setPage={setPage} paginatedBooks={paginatedBooks} />
  );
}
