import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  bookSaveRequest,
  isBookSavedRequest,
} from "../../Services/api/service";
import { Check, BookmarkPlus } from "lucide-react";

interface SaveBookButtonProps {
  shelf_name: string;
  book_id: string | undefined;
}

export default function SaveBookButton(props: SaveBookButtonProps) {
  const { user } = useAuthContext();
  const [isSavedAux, setIsSavedAux] = useState<boolean>(false);

  const { data: isSaved } = useQuery({
    queryKey: [
      "saved",
      props.shelf_name,
      user?.email,
      props.book_id,
      setIsSavedAux,
    ],
    queryFn: () => isBookSavedRequest(props.shelf_name, props.book_id),
  });

  const { mutate } = useMutation({
    mutationFn: () => bookSaveRequest(props.shelf_name, props.book_id),
    onSuccess: (result) => {
      setIsSavedAux(result);
    },
  });

  useEffect(() => {
    if (isSaved != undefined) {
      setIsSavedAux(isSaved);
    }
  }, [isSaved]);

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-sm border transition-all ${
        isSavedAux
          ? "bg-[#f0ece1] border-[#5a4a42]"
          : "bg-white border-[#d6ccb8] hover:border-[#a69b90]"
      }`}
    >
      <div className="flex items-center space-x-2.5">
        {isSavedAux ? (
          <Check className="w-4 h-4 text-[#5a4a42]" />
        ) : (
          <BookmarkPlus className="w-4 h-4 text-[#a69b90]" />
        )}
        <span className="font-serif text-xs md:text-sm text-[#3e322c] uppercase tracking-wide font-medium">
          {props.shelf_name}
        </span>
      </div>

      <button
        className={`font-sans text-[11px] uppercase tracking-wider py-1.5 px-4 rounded-sm transition-all cursor-pointer ${
          isSavedAux
            ? "bg-transparent border border-[#5a4a42] text-[#5a4a42] hover:bg-[#5a4a42] hover:text-white"
            : "bg-[#5a4a42] text-[#f7f4ec] hover:bg-[#4a3b32]"
        }`}
        onClick={() => mutate()}
      >
        {isSavedAux ? "Remove" : "Save"}
      </button>
    </div>
  );
}
