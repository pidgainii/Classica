import CategoryNavigation from "./ui/CategoryNavigation";
import Logo from "./ui/Logo";
import MainNavigation from "./ui/MainNavigation";
import SearchBar from "./ui/SearchBar";

export default function Header() {
  return (
    <header className="pt-10 pb-4 px-8 flex flex-col items-center relative max-w-7xl mx-auto w-full">
      <div className="w-full flex justify-between items-center relative">
        {/* Divider to center Logo absolutely */}
        <div className="flex-1 hidden md:block"></div>
        <Logo />
        <SearchBar />
      </div>

      <MainNavigation />
      <CategoryNavigation />
    </header>
  );
}
