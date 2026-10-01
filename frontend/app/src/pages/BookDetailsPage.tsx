import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Book } from "../Models/book";
import { bookRequest } from "../Services/api/service";

export default function BookDetailsPage() {
  const params = useParams();

  // TODO: Add LOADING VARIABLE. MAYBE GLOBAL. (While loading book). Same for HomePage.

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!book && params.id) {
        const bookLoad = await bookRequest(params.id);
        setBook(bookLoad);
      }
    };
    fetchData();
  });

  return (
    <div>
      <div className="w-40">
        <img
          src={book?.cover_url}
          alt={`Portada de ${book?.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2>Title: {book?.title}</h2>
      <h3>Author: {book?.author}</h3>

      <p></p>

      <p>Description: {book?.description}</p>

      <p></p>

      <p>Language: {book?.language}</p>
    </div>
  );
}
