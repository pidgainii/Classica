import { useState } from "react";
import DeleteAccountModal from "../../Components/ui/DeleteAccountModal";

export default function DeleteAccountPage() {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsDeleteAccountModalOpen(true)}>
        Delete Account
      </button>

      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        setIsOpen={setIsDeleteAccountModalOpen}
      />
    </div>
  );
}
