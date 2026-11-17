import { useMutation } from "@tanstack/react-query";
import { deleteAccountRequest } from "../../Services/api/service";

interface DeleteAccountModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DeleteAccountModal(props: DeleteAccountModalProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccountRequest,
    onSuccess: () => {
      props.setIsOpen(false);
    },
  });

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-[#f7f4ec] border border-[#d6ccb8] shadow-2xl rounded-sm p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="font-serif text-base text-[#3e322c] uppercase tracking-widest mb-4 pb-2 border-b border-[#e6decb] font-semibold">
          Do you want to delete your account permanently?
        </div>

        <div className="flex justify-end space-x-3 pt-2 border-t border-[#e6decb]">
          <button
            onClick={() => props.setIsOpen(false)}
            className="bg-transparent border border-[#d6ccb8] text-[#5a4a42] hover:bg-[#e6decb] font-sans text-xs uppercase tracking-wider py-2 px-4 rounded-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => mutate()}
            className="bg-[#5a4a42] text-[#f7f4ec] hover:bg-[#4a3b32] font-sans text-xs uppercase tracking-wider py-2 px-6 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
