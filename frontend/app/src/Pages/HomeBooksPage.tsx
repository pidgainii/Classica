import { useEffect, useState } from "react";
import type { BookType } from "../Models/book";
import { tenBooksRequest } from "../Services/api/service";
import BookCard from "../Components/ui/BookCard";

export default function HomeBooksPage() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tenBooksRequest();
      if (response.success) setBooks(response.data);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-[#e8e8e8] py-16 px-8 min-h-screen border-t border-gray-300 shadow-inner">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-10">
        {books.map((book) => (
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
