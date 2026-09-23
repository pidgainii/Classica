import { useEffect, useState } from "react";
import { getBooks } from "../services/api/bookService";
import type { Book } from "../models/book";

export default function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const books = await getBooks();
        setBooks(books);
        setIsLoading(true);
      } catch {
        setError(true);
        setIsLoading(true);
      } finally {
      }
    };

    fetchData();
  }, []);

  return { books, isLoading, error };
}
