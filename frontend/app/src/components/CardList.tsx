import type { Book } from "../models/book";
import BookCard from "./ui/BookCard";

interface BookCardListProps {
  books: Book[];
}

export default function BookCardList({ books }: BookCardListProps) {
  return (
    <div style={display: block}>
      {books.map((book) => (
        <BookCard key={book.id} book={book}></BookCard>
      ))}
    </div>
  );
}
