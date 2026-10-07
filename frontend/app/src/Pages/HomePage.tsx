import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TopBar from "../Components/ui/TopBar";
import { useAuthContext } from "../Contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-gray-800">
      {/* 1. BARRA SUPERIOR (Top Bar oscura) */}
      <TopBar />

      <h2>{user ? user.email + "logged in" : ""}</h2>

      {/* 2. CABECERA PRINCIPAL (Logo y Buscador) */}
      <Header />

      {/* Books or Blog Page */}
      <Outlet />

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}
