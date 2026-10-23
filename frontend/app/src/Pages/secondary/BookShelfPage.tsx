import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../Utils/localStorageUtils";
import { BOOKS_PER_PAGE, SORT_BY_OPTIONS } from "../../Utils/Constants";
import BookGrid from "../../Components/ui/BookGrid";
import { useParams } from "react-router";
import { shelfBooksRequest } from "../../Services/api/service";
import { useAuthContext } from "../../Contexts/AuthContext";

export default function BookShelfPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { name } = useParams();

  const [page, setPage] = useState<number>(
    getLocalStorageItem(`${name}_shelf_page`) || 1,
  );

  // We are sending the name of the book shelf inside the Search Query to reuse the BookSearchFiltersDTO
  const {
    data: paginatedBooks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["shelf_books", name, user?.email, page],
    queryFn: () =>
      shelfBooksRequest({
        page: page,
        perPage: BOOKS_PER_PAGE,
        searchQuery: name ? name : "",
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
          queryKey: ["shelf_books", name, user?.email, page + 1],
          queryFn: () =>
            shelfBooksRequest({
              page: page + 1,
              perPage: BOOKS_PER_PAGE,
              searchQuery: name ? name : "",
              sortBy: SORT_BY_OPTIONS[0],
              genres: [],
              languages: [],
            }),
        })
        .catch(noop);
    }
  }, [paginatedBooks, page, queryClient]);

  useEffect(() => {
    setLocalStorageItem(`${name}_shelf_page`, page);
  }, [page]);

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h1>{name}: </h1>
      <BookGrid page={page} setPage={setPage} paginatedBooks={paginatedBooks} />
    </div>
  );
}
