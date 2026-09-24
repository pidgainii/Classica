import type { Book } from "../../models/book";
import { Card } from "@heroui/react";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Card className="w-[200px] gap-2">
        {/* First we show the image in the upper part */}
        <img
          alt={book.title}
          className="pointer-events-none w-50 rounded-2xl object-cover select-none"
          loading="lazy"
          src={book.cover_url}
        />

        <Card.Header>
          <Card.Title className="text-left line-clamp-2">
            {book.title}
          </Card.Title>
          <Card.Description className="text-left line-clamp-1">
            {book.author}
          </Card.Description>
        </Card.Header>
      </Card>
    </div>
  );
}
