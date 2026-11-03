import { Link } from "react-router";
import type { BookType } from "../../Models/book";

interface BookCardProps {
  book: BookType;
}

export default function BookCard(props: BookCardProps) {
  return (
    <div className="w-full flex flex-col items-center group relative">
      {/* Contenedor de la portada con sombra similar a un libro real */}
      <Link to={`/book/${props.book.id}`} className="w-full">
        <div className="relative w-full aspect-[2/3] shadow-[4px_4px_12px_rgba(0,0,0,0.12)] group-hover:shadow-[6px_6px_18px_rgba(0,0,0,0.25)] transition-shadow duration-300 bg-white rounded-sm overflow-hidden">
          <img
            src={props.book.cover_url}
            alt={`Portada de ${props.book.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Mostrar título y autor estrictamente al pasar el ratón, limitado a dos líneas */}
      <div className="absolute inset-x-0 bottom-0 bg-[#f7f4ec]/95 p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
        <h3 className="text-[11px] font-serif font-semibold text-[#3e322c] line-clamp-2 leading-tight">
          {props.book.title}
        </h3>
        <p className="text-[9px] text-[#7a6b63] mt-0.5 uppercase line-clamp-2 tracking-wider">
          {props.book.author}
        </p>
      </div>
    </div>
  );
}
