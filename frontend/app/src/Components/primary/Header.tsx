import type { PropsWithChildren } from "react";
import Logo from "../ui/Logo";

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="pt-6 pb-2 px-8 flex flex-col items-center relative w-full">
      <div className="w-full flex justify-center items-center relative">
        <Logo />
      </div>

      {children}
    </header>
  );
}
