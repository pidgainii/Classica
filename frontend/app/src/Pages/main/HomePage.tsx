import { Outlet } from "react-router";
import Footer from "../../Components/primary/Footer";
import Header from "../../Components/primary/Header";
import TopBar from "../../Components/primary/TopBar";
import MainNavigationBar from "../../Components/ui/MainNavigationBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-gray-800">
      <TopBar />

      <Header>
        <MainNavigationBar />
      </Header>

      {/* Books or Blog Page */}
      <Outlet />

      <Footer />
    </div>
  );
}
