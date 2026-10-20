import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import {
  bookFavouriteRequest,
  isBookFavouriteRequest,
} from "../../Services/api/service";
import { useEffect, useState } from "react";
import { Heart, HeartOff } from "lucide-react";

interface FavouriteButtonProps {
  book_id: string | undefined;
}

export default function FavouriteButton(props: FavouriteButtonProps) {
  const { user } = useAuthContext();
  const [isFavouriteAux, setIsFavouriteAux] = useState<boolean>(false);

  const { data: isFavourite } = useQuery({
    queryKey: ["favourite", props.book_id, user?.email, setIsFavouriteAux],
    queryFn: () => isBookFavouriteRequest(props.book_id),
  });

  const onClickFavouriteButton = async () => {
    const result = await bookFavouriteRequest(props.book_id);
    setIsFavouriteAux(result);
  };

  useEffect(() => {
    if (isFavourite != undefined) {
      setIsFavouriteAux(isFavourite);
    }
  }, [isFavourite]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClickFavouriteButton}
      >
        Favourite
      </button>
      {isFavouriteAux ? <Heart /> : <HeartOff />}
    </div>
  );
}
