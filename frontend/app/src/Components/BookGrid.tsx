import type { Book } from "../Models/book";

interface BookGridProps {
  books: Book[];
}

export default function BookGrid(props: BookGridProps) {
  return (
    <main className="bg-[#e8e8e8] py-16 px-8 min-h-screen border-t border-gray-300 shadow-inner">
      {/* Utilizamos un grid de 7 columnas en pantallas grandes para imitar el diseño de la imagen */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-10">
        {props.books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Contenedor de la portada con sombra similar a un libro real */}
            <div className="relative w-full aspect-[2/3] shadow-[5px_5px_15px_rgba(0,0,0,0.15)] group-hover:shadow-[5px_5px_20px_rgba(0,0,0,0.3)] transition-shadow duration-300 bg-white">
              <img
                src={book.cover_url}
                alt={`Portada de ${book.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Opcional: Mostrar título al pasar el ratón (ya que en la foto original casi no hay texto debajo) */}
            <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                {book.title}
              </h3>
              <p className="text-[10px] text-gray-500 mt-1 uppercase">
                {book.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
