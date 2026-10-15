import type { PropsWithChildren } from "react";
import Logo from "../ui/Logo";

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="pt-10 pb-4 px-8 flex flex-col items-center relative max-w-7xl mx-auto w-full">
      <div className="w-full flex justify-between items-center relative">
        <Logo />
      </div>

      {children}
    </header>
  );
}
