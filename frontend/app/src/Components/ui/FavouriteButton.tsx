import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import {
  bookFavouriteRequest,
  isBookFavouriteRequest,
} from "../../Services/api/service";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

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
    <button
      className={`flex items-center space-x-2 font-sans text-xs uppercase tracking-wider py-2.5 px-6 rounded-sm transition-all shadow-sm border ${
        isFavouriteAux
          ? "bg-[#6b3e3e] border-[#6b3e3e] text-white hover:bg-[#583333]"
          : "bg-[#5a4a42] border-[#5a4a42] text-[#f7f4ec] hover:bg-[#4a3b32]"
      }`}
      onClick={() => mutate()}
    >
      <Heart
        className={`w-4 h-4 ${isFavouriteAux ? "fill-current text-white" : ""}`}
      />
      <span>{isFavouriteAux ? "Favorited" : "Add to Favourites"}</span>
    </button>
  );
}
