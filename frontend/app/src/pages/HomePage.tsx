import BookCard from "../components/BookCard";
import useBooks from "../hooks/useBooks";

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
