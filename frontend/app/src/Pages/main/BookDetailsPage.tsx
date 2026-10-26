import { useNavigate, useParams } from "react-router";
import { bookRequest } from "../../Services/api/service";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import FavouriteButton from "../../Components/ui/FavouriteButton";
import SaveBookModal from "../../Components/ui/SaveBookModal";
import { useState } from "react";

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
    queryKey: ["book"],
    queryFn: () => bookRequest(id),
    gcTime: 0,
  });

  if (isPending) return <h1>Loading...</h1>;

  if (error || !id) return <h1>Error</h1>;

  return (
    <div>
      <div className="w-40">
        <img
          src={book?.cover_url}
          alt={`Portada de ${book?.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2>Title: {book?.title}</h2>
      <h3>Author: {book?.author}</h3>

      <p></p>

      <p>Description: {book?.description}</p>

      <p></p>

      <p>Language: {book?.language}</p>

      <p></p>

      <p>Genres: {book.genres}</p>

      {user && (
        <div>
          <FavouriteButton book_id={id} />

          <button
            onClick={() => setIsSaveBookModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>

          <SaveBookModal
            book_id={id}
            isOpen={isSaveBookModalOpen}
            setIsOpen={setIsSaveBookModalOpen}
          />

          <p></p>

          <button
            onClick={() => navigate(`/newpost/${id}`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Post
          </button>
        </div>
      )}
    </div>
  );
}
