import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../Services/api/service";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: () =>
      registerRequest({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      }),
    onSuccess: () => {
      setSuccessMessage("Register completed!");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
    },
    onError: () => {
      setErrorMessage("Not able to register");
    },
  });

  return (
    <div>
      <h1>Register Page</h1>
      <div className="flex flex-col items-center justify-center">
        <input
          type="email"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="firstname"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          type="lastname"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          type="password"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          onClick={() => mutate()}
          className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
        >
          Register
        </button>

        <h2>{successMessage ? successMessage : ""}</h2>
        <h2>{errorMessage ? errorMessage : ""}</h2>
      </div>
    </div>
  );
}
