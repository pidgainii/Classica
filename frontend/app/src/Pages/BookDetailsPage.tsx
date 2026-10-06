import { useParams } from "react-router";
import { bookRequest } from "../Services/api/service";
import { useQuery } from "@tanstack/react-query";

export default function BookDetailsPage() {
  const { id } = useParams();

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

  if (error) return <h1>Error</h1>;

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
    </div>
  );
}
