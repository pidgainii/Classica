import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  bookSaveRequest,
  isBookSavedRequest,
} from "../../Services/api/service";

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
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => mutate()}
      >
        {props.shelf_name}
      </button>
      {isSavedAux ? <h3>Saved</h3> : <h3>Unsaved</h3>}
    </div>
  );
}
