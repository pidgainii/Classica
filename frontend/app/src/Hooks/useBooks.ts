import { useEffect, useState } from "react";
import { tenBooksRequest } from "../Services/api/service";
import type { Book } from "../Models/book";

// TODO: DO this properly
export default function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const books = await tenBooksRequest();
        if 

        if (books) setBooks(books);
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
