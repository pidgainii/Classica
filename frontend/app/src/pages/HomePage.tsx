import BookGrid from "../Components/BookGrid";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TopBar from "../Components/ui/TopBar";
import useBooks from "../Hooks/useBooks";

export default function HomePage() {
  const { books, isLoading, error } = useBooks();

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-600">
        Cargando la biblioteca...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar los libros.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-gray-800">
      {/* 1. BARRA SUPERIOR (Top Bar oscura) */}
      <TopBar />

      {/* 2. CABECERA PRINCIPAL (Logo y Buscador) */}
      <Header />

      {/* 5. SECCIÓN PRINCIPAL: GRID DE LIBROS */}
      <BookGrid books={books} />

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}
