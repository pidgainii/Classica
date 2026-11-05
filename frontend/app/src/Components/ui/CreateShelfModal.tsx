import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBookShelfRequest } from "../../Services/api/service";

interface CreateShelfModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function CreateShelfModal(props: CreateShelfModalProps) {
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onClickCancel = () => {
    setName("");
    setErrorMessage("");
    props.setIsOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => createBookShelfRequest(name),
    onSuccess: () => {
      setName("");
      setErrorMessage("");
      props.refetch();
      props.setIsOpen(false);
    },
    onError: (e: Error) => {
      setErrorMessage(e.message);
    },
  });

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-[#f7f4ec] border border-[#d6ccb8] shadow-2xl rounded-sm p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="font-serif text-base text-[#3e322c] uppercase tracking-widest mb-4 pb-2 border-b border-[#e6decb] font-semibold">
          Create a new Book Shelf
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-xs font-sans uppercase tracking-wider text-[#7a6b63]">
            Shelf Name:
          </label>
          <input
            className="w-full bg-white border border-[#d6ccb8] px-3 py-2 text-xs text-[#5a4a42] outline-none focus:border-[#5a4a42] rounded-sm"
            placeholder="e.g. Classics, Sci-Fi..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMessage && (
            <p className="text-xs text-red-600 font-sans mt-1">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-2 border-t border-[#e6decb]">
          <button
            onClick={onClickCancel}
            className="bg-transparent border border-[#d6ccb8] text-[#5a4a42] hover:bg-[#e6decb] font-sans text-xs uppercase tracking-wider py-2 px-4 rounded-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => mutate()}
            disabled={isPending || !name.trim()}
            className="bg-[#5a4a42] text-[#f7f4ec] hover:bg-[#4a3b32] font-sans text-xs uppercase tracking-wider py-2 px-6 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
