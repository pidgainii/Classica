import { useMutation, useQuery } from "@tanstack/react-query";
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
    queryKey: ["favourite", props.book_id, user?.email, isFavouriteAux],
    queryFn: () => isBookFavouriteRequest(props.book_id),
  });

  const { mutate } = useMutation({
    mutationFn: () => bookFavouriteRequest(props.book_id),
    onSuccess: (result) => {
      setIsFavouriteAux(result);
    },
  });

  useEffect(() => {
    if (isFavourite != undefined) {
      setIsFavouriteAux(isFavourite);
    }
  }, [isFavourite]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => mutate()}
      >
        Favourite
      </button>
      {isFavouriteAux ? <Heart /> : <HeartOff />}
    </div>
  );
}
