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
    <main className="w-full bg-[#f0ece1] py-16 px-6 md:px-16 border-t border-[#e6decb] shadow-inner flex flex-col items-center">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-12">
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
        <div className="mt-16 flex justify-center w-full">
          <PaginationElement
            page={props.page}
            setPage={props.setPage}
            totalPages={props.paginatedBooks.pages}
          />
        </div>
      )}
    </main>
  );
}
