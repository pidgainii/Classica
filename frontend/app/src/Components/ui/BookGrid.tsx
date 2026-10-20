import type { BooksPaginatedType } from "../../Models/book";
import BookCard from "./BookCard";
import { PaginationElement } from "./PaginationElement";

interface BookGridProps {
  paginatedBooks: BooksPaginatedType;
  page: number;
  setPage: (page: number) => void;
}

export default function BookGrid(props: BookGridProps) {
  return (
    <main className="bg-[#e8e8e8] py-16 px-8 min-h-screen border-t border-gray-300 shadow-inner">
      <h3>Current Page: {props.page}</h3>
      <div>&nbsp;</div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-10">
        {props.paginatedBooks.books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center group cursor-pointer"
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
      {props.paginatedBooks.pages > 1 && (
        <PaginationElement
          page={props.page}
          setPage={props.setPage}
          totalPages={props.paginatedBooks.pages}
        ></PaginationElement>
      )}
    </main>
  );
}
