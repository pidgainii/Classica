import { useNavigate } from "react-router";
import type { BookType } from "../../Models/book";

interface BookCardProps {
  book: BookType;
}

export default function BookCard(props: BookCardProps) {
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/book/${props.book.id}`);
  };

  return (
    <div>
      {/* Contenedor de la portada con sombra similar a un libro real */}
      <button onClick={onClickCard}>
        <div className="relative w-full aspect-[2/3] shadow-[5px_5px_15px_rgba(0,0,0,0.15)] group-hover:shadow-[5px_5px_20px_rgba(0,0,0,0.3)] transition-shadow duration-300 bg-white">
          <img
            src={props.book.cover_url}
            alt={`Portada de ${props.book.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {/* Opcional: Mostrar título al pasar el ratón (ya que en la foto original casi no hay texto debajo) */}
      <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
          {props.book.title}
        </h3>
        <p className="text-[10px] text-gray-500 mt-1 uppercase">
          {props.book.author}
        </p>
      </div>
    </div>
  );
}
