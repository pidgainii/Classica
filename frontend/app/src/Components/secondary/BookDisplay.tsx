import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { booksRequest } from "../../Services/api/service";
import { BOOKS_PER_PAGE } from "../../Utils/Constants";
import BookCard from "../ui/BookCard";
import { PaginationElement } from "../ui/PaginationElement";

interface BookDisplayProps {
  page: number;
  setPage: (page: number) => void;

  searchQuery: string;
  sortBy: string;
  genres: string[];
  languages: string[];
}

export default function BookDisplay(props: BookDisplayProps) {
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

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <main className="bg-[#e8e8e8] py-16 px-8 min-h-screen border-t border-gray-300 shadow-inner">
      <h3>Current Page: {props.page}</h3>
      <div>&nbsp;</div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-10">
        {paginatedBooks.books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center group cursor-pointer"
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
      <PaginationElement
        page={props.page}
        setPage={props.setPage}
        totalPages={paginatedBooks.pages}
      ></PaginationElement>
    </main>
  );
}
