import BookCardList from "../components/CardList";
import useBooks from "../hooks/useBooks";

export default function HomePage() {
  const { books, isLoading, error } = useBooks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>Home Page: Classica</h1>
      <BookCardList books={books}></BookCardList>
    </div>
  );
}
