import type { BookType } from "../Models/book";
import BookCard from "./ui/BookCard";

interface BookGridProps {
  books: BookType[];
}

export default function BookGrid(props: BookGridProps) {
  return (
    <main className="bg-[#e8e8e8] py-16 px-8 min-h-screen border-t border-gray-300 shadow-inner">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-10">
        {props.books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center group cursor-pointer"
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </main>
  );
}
