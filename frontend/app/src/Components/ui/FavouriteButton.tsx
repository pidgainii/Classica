import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { bookFavouriteRequest } from "../../Services/api/service";

interface FavouriteButtonProps {
  book_id: string | undefined;
}

export default function FavouriteButton(props: FavouriteButtonProps) {
  const { user } = useAuthContext();
  const { data: isFavourite } = useQuery({
    queryKey: ["favourite", props.book_id, user?.email],
    queryFn: () => bookFavouriteRequest(props.book_id),
  });

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Favourite
      </button>
      <h2>{isFavourite && <div>True!!!</div>}</h2>
    </div>
  );
}
