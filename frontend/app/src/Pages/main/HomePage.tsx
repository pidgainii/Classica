import { Outlet } from "react-router";
import Footer from "../../Components/primary/Footer";
import Header from "../../Components/primary/Header";
import TopBar from "../../Components/primary/TopBar";
import MainNavigationBar from "../../Components/ui/MainNavigationBar";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#f7f4ec] font-serif text-[#3e322c] flex flex-col justify-between">
      <div>
        <TopBar />
        <Header>
          <MainNavigationBar />
        </Header>
        {/* Books or Blog Page */}
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
