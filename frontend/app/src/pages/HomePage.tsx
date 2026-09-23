import useBooks from "../hooks/useBooks";
import type { Book } from "../models/book";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div>
      <p>{book.title}</p>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>{book.language}</p>
      <p>{book.isbn}</p>
      <p>{book.cover_url}</p>
    </div>
  );
}

export default function HomePage() {
  const { books, isLoading, error } = useBooks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <div>HomePage</div>
      <div>
        {books.map((book) => (
          <BookCard key={book.id} book={book}></BookCard>
        ))}
      </div>
    </div>
  );
}
