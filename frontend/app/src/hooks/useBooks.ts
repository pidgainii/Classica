import { useEffect, useState } from "react";
import { getBooks } from "../Services/api/bookService";
import type { Book } from "../Models/book";

export default function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const books = await getBooks();
        console.log(books);
        setBooks(books);
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      } finally {
      }
    };

    fetchData();
  }, []);

  return { books, isLoading, error };
}
