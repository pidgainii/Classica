import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { booksRequest } from "../../Services/api/service";
import { BOOKS_PER_PAGE } from "../../Utils/Constants";
import BookGrid from "../ui/BookGrid";
import { setLocalStorageItem } from "../../Utils/localStorageUtils";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";

interface HomeBookDisplayProps {
  page: number;
  setPage: (page: number) => void;
  searchQuery: string;
  sortBy: string;
  genres: string[];
  languages: string[];
}

export default function HomeBookDisplay(props: HomeBookDisplayProps) {
  const queryClient = useQueryClient();

  const {
    data: paginatedBooks,
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "books",
      props.searchQuery,
      props.sortBy,
      props.page,
      props.genres,
      props.languages,
    ],
    queryFn: () =>
      booksRequest({
        page: props.page,
        perPage: BOOKS_PER_PAGE,
        searchQuery: props.searchQuery,
        sortBy: props.sortBy,
        genres: props.genres,
        languages: props.languages,
      }),
    staleTime: Infinity,
  });

  // Prefetching the next page
  useEffect(() => {
    if (paginatedBooks && props.page < paginatedBooks.pages) {
      queryClient
        .query({
          queryKey: [
            "books",
            props.searchQuery,
            props.sortBy,
            props.page + 1,
            props.genres,
            props.languages,
          ],
          queryFn: () =>
            booksRequest({
              page: props.page + 1,
              perPage: BOOKS_PER_PAGE,
              searchQuery: props.searchQuery,
              sortBy: props.sortBy,
              genres: props.genres,
              languages: props.languages,
            }),
        })
        .catch(noop);
    }
  }, [paginatedBooks, props.page, queryClient]);

  useEffect(() => {
    setLocalStorageItem("page", props.page);
  }, [props.page]);

  if (isPending) return <Loading />;

  if (error)
    return (
      <Error message="Books could not be loaded. Please try again later." />
    );

  return (
    <BookGrid
      page={props.page}
      setPage={props.setPage}
      paginatedBooks={paginatedBooks}
    />
  );
}
