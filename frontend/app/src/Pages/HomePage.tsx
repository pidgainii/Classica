import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TopBar from "../Components/ui/TopBar";
import MainNavigation from "../Components/ui/MainNavigation";
import CategoryNavigation from "../Components/ui/CategoryNavigation";
import OrderFiltersNavigation from "../Components/ui/OrderFiltersNavigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-gray-800">
      <TopBar />

      <Header>
        <MainNavigation />
        <OrderFiltersNavigation />
        <CategoryNavigation />
      </Header>

      {/* Books or Blog Page */}
      <Outlet />

      <Footer />
    </div>
  );
}
