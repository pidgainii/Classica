import { booksRequest } from "../Services/api/service";
import BookCard from "../Components/ui/BookCard";
import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../Utils/localStorageUtils";
import { PaginationElement } from "../Components/ui/PaginationElement";

export default function HomeBooksPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(getLocalStorageItem("page") || 1);

  const {
    data: paginatedBooks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["books", page],
    queryFn: () => booksRequest(page, 14),
    staleTime: Infinity,
  });

  // Prefetching the next page
  useEffect(() => {
    if (paginatedBooks && page < paginatedBooks.pages) {
      queryClient
        .query({
          queryKey: ["books", page + 1],
          queryFn: () => booksRequest(page + 1, 14),
        })
        .catch(noop);
    }
  }, [paginatedBooks, page, queryClient]);

  // Updating page number in local storage every time user changes page
  useEffect(() => {
    setLocalStorageItem("page", page);
  }, [page]);

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <main className="bg-[#e8e8e8] py-16 px-8 min-h-screen border-t border-gray-300 shadow-inner">
      <h3>Current Page: {page}</h3>
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
        page={page}
        setPage={setPage}
        totalPages={paginatedBooks.pages}
      ></PaginationElement>
    </main>
  );
}
