import { useQuery } from "@tanstack/react-query";
import { shelvesRequest } from "../../Services/api/service";
import { useAuthContext } from "../../Contexts/AuthContext";
import SaveBookButton from "./SaveBookButton";

interface SaveBookModalProps {
  book_id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SaveBookModal(props: SaveBookModalProps) {
  const { user } = useAuthContext();

  const {
    data: shelves,
    isPending,
    error,
  } = useQuery({
    queryKey: ["shelves", user?.email],
    queryFn: shelvesRequest,
  });

  const onClickAccept = () => {
    props.setIsOpen(false);
  };

  if (!props.isOpen || isPending || error) return null;
  return (
    <div>
      <div>Save Book:</div>

      <div>
        {shelves.map((shelf) => (
          <div>
            <div
              key={shelf.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              <SaveBookButton shelf_name={shelf.name} book_id={props.book_id} />
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => onClickAccept()}>Accept</button>
    </div>
  );
}
