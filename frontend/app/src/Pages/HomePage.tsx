import { useEffect, useState } from "react";
import BookGrid from "../Components/BookGrid";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TopBar from "../Components/ui/TopBar";
import { useAuthContext } from "../Contexts/AuthContext";
import type { BookType } from "../Models/book";
import { tenBooksRequest } from "../Services/api/service";

export default function HomePage() {
  const { user } = useAuthContext();
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tenBooksRequest();
      if (response.success) setBooks(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-gray-800">
      {/* 1. BARRA SUPERIOR (Top Bar oscura) */}
      <TopBar />

      <h2>{user ? user.email + "logged in" : ""}</h2>

      {/* 2. CABECERA PRINCIPAL (Logo y Buscador) */}
      <Header />

      {/* 5. SECCIÓN PRINCIPAL: GRID DE LIBROS */}
      <BookGrid books={books} />

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}
