import type { Book } from "../models/book";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article>
      <img src={book.cover_url} alt={book.title} />
      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      <p>{book.description}</p>
    </article>
  );
}
