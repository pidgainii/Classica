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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-[#f7f4ec] border border-[#d6ccb8] shadow-2xl rounded-sm p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-3 border-b border-[#e6decb] mb-4">
          <h3 className="font-serif text-base text-[#3e322c] uppercase tracking-widest font-semibold">
            Save to Reading Shelf
          </h3>
          <button
            onClick={() => props.setIsOpen(false)}
            className="text-[#7a6b63] hover:text-[#3e322c] text-sm font-sans"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-1">
          {shelves.map((shelf: { id: string; name: string }) => (
            <div key={shelf.id} className="flex flex-col items-stretch">
              <SaveBookButton shelf_name={shelf.name} book_id={props.book_id} />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-[#e6decb]">
          <button
            onClick={() => onClickAccept()}
            className="bg-[#5a4a42] text-[#f7f4ec] hover:bg-[#4a3b32] font-sans text-xs uppercase tracking-wider py-2 px-6 rounded-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
