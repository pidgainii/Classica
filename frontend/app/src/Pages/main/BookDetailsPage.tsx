import { useNavigate, useParams } from "react-router";
import { bookRequest } from "../../Services/api/service";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import FavouriteButton from "../../Components/ui/FavouriteButton";
import SaveBookModal from "../../Components/ui/SaveBookModal";
import { useState } from "react";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { Bookmark, PenSquare } from "lucide-react";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [isSaveBookModalOpen, setIsSaveBookModalOpen] =
    useState<boolean>(false);

  const {
    data: book,
    isPending,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => bookRequest(id),
    gcTime: 0,
  });

  if (isPending) return <Loading />;

  if (error || !id)
    return <Error message="No se pudo cargar la información del libro." />;

  return (
    <div className="w-full bg-[#f7f4ec] min-h-[80vh] py-16 px-6 md:px-16 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Book Cover Column */}
        <div className="md:col-span-4 flex justify-center">
          <div className="w-64 md:w-full aspect-[2/3] shadow-[8px_8px_24px_rgba(0,0,0,0.18)] rounded-sm overflow-hidden bg-white">
            <img
              src={book?.cover_url}
              alt={`Portada de ${book?.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Book Info Column */}
        <div className="md:col-span-8 flex flex-col space-y-6">
          <div>
            <h1
              className="text-4xl md:text-5xl font-serif text-[#3e322c] font-normal tracking-wide"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {book?.title}
            </h1>
            <h2 className="text-xl font-serif italic text-[#7a6b63] mt-2">
              {book?.author}
            </h2>
          </div>

          <hr className="border-t border-[#e6decb]" />

          <p className="text-sm md:text-base font-serif text-[#5a4a42] leading-relaxed">
            {book?.description}
          </p>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#e6decb] text-xs">
            <div>
              <span className="block tracking-widest text-[#8a7a70] uppercase font-sans font-semibold mb-1">
                Language
              </span>
              <span className="font-serif text-sm text-[#3e322c]">
                {book?.language}
              </span>
            </div>
            <div>
              <span className="block tracking-widest text-[#8a7a70] uppercase font-sans font-semibold mb-1">
                ISBN
              </span>
              <span className="font-serif text-sm text-[#3e322c]">
                {book?.isbn || "N/A"}
              </span>
            </div>
            <div>
              <span className="block tracking-widest text-[#8a7a70] uppercase font-sans font-semibold mb-1">
                Genres
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {Array.isArray(book?.genres) ? (
                  book.genres.map((g: string) => (
                    <span
                      key={g}
                      className="bg-[#f0ece1] border border-[#d6ccb8] px-2.5 py-0.5 rounded-full text-[10px] text-[#5a4a42]"
                    >
                      {g}
                    </span>
                  ))
                ) : (
                  <span className="font-serif text-sm text-[#3e322c]">
                    {book?.genres}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Conditional User Actions */}
          {user && (
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <FavouriteButton book_id={id} />

              <button
                onClick={() => setIsSaveBookModalOpen(true)}
                className="flex items-center space-x-2 bg-transparent border border-[#5a4a42] text-[#5a4a42] hover:bg-[#5a4a42] hover:text-[#f7f4ec] font-sans text-xs uppercase tracking-wider py-2.5 px-6 rounded-sm transition-all shadow-sm cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>

              <SaveBookModal
                book_id={id}
                isOpen={isSaveBookModalOpen}
                setIsOpen={setIsSaveBookModalOpen}
              />

              <button
                onClick={() => navigate(`/newpost/${id}`)}
                className="flex items-center space-x-2 bg-[#5a4a42] text-[#f7f4ec] hover:bg-[#4a3b32] font-sans text-xs uppercase tracking-wider py-2.5 px-6 rounded-sm transition-all shadow-sm cursor-pointer"
              >
                <PenSquare className="w-4 h-4" />
                <span>Create Post</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
