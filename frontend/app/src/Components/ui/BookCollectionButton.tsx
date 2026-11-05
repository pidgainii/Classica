import { useNavigate } from "react-router";
import type { BookType } from "../../Models/book";
import { ChevronRight, BookOpen } from "lucide-react";

interface BookCollectionButtonProps {
  books?: BookType[];
  url: string;
}

export default function BookCollectionButton(props: BookCollectionButtonProps) {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate(props.url);
  };

  const displayBooks = props.books ? props.books.slice(0, 10) : [];

  return (
    <button
      onClick={onClickButton}
      className="w-full bg-transparent border-0 p-0 flex items-center justify-between group cursor-pointer text-left focus:outline-none"
    >
      {/* Overlapping Book Covers Container spanning full width */}
      <div className="flex items-center overflow-x-auto overflow-y-hidden py-2 w-full pr-4">
        {displayBooks.length > 0 ? (
          <div className="flex items-center">
            {displayBooks.map((book, index) => (
              <div
                key={book.id || index}
                className="w-16 md:w-20 aspect-[2/3] rounded-sm shadow-[3px_3px_12px_rgba(0,0,0,0.25)] bg-white overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]"
                style={{
                  marginLeft: index === 0 ? "0px" : "-32px",
                  zIndex: index,
                }}
              >
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center space-x-3 text-[#a69b90] py-4">
            <div className="flex items-center space-x-[-12px]">
              <div className="w-12 aspect-[2/3] bg-[#f0ece1] border border-[#d6ccb8] rounded-sm flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4 text-[#a69b90]" />
              </div>
              <div className="w-12 aspect-[2/3] bg-[#f0ece1] border border-[#d6ccb8] rounded-sm flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4 text-[#a69b90]" />
              </div>
              <div className="w-12 aspect-[2/3] bg-[#f0ece1] border border-[#d6ccb8] rounded-sm flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4 text-[#a69b90]" />
              </div>
            </div>
            <span className="font-serif text-xs uppercase tracking-wider pl-3">
              No books added yet
            </span>
          </div>
        )}
      </div>

      {/* Right Navigation Arrow */}
      <div className="pl-2 text-[#5a4a42] group-hover:translate-x-1.5 transition-transform shrink-0">
        <ChevronRight className="w-8 h-8" />
      </div>
    </button>
  );
}
