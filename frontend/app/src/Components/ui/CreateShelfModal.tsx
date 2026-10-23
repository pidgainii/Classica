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

  const { mutate } = useMutation({
    mutationFn: () => createBookShelfRequest(name),
    onSuccess: () => {
      setName("");
      setErrorMessage("");
      props.refetch();
      props.setIsOpen(false);
    },
    onError: (e) => {
      setErrorMessage(e.message);
    },
  });

  if (!props.isOpen) return null;
  return (
    <div>
      <div>Create a new Book Shelf</div>
      <label>Name: </label>
      <input
        className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
        placeholder="My Book Shelf"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      {errorMessage == "" ? null : <div>{errorMessage}</div>}
      <button onClick={() => onClickCancel()}>Cancel</button>
      <button onClick={() => mutate()}>Accept</button>
    </div>
  );
}
