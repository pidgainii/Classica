import { useState } from "react";
import CreateShelfModal from "../../Components/ui/CreateShelfModal";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import {
  favouriteBooksRequest,
  shelvesRequest,
} from "../../Services/api/service";
import BookCollectionButton from "../../Components/ui/BookCollectionButton";
import { BOOKS_PER_PAGE, SORT_BY_OPTIONS } from "../../Utils/Constants";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { Plus } from "lucide-react";

export default function MyLibraryPage() {
  const [isCreateShelfModalOpen, setIsCreateShelfModalOpen] =
    useState<boolean>(false);

  const { user } = useAuthContext();

  const {
    data: shelves,
    isPending: isShelvesPending,
    error: shelvesError,
    refetch,
  } = useQuery({
    queryKey: ["shelves", user?.email],
    queryFn: shelvesRequest,
  });

  const { data: paginatedFavouriteBooks, isPending: isFavPending } = useQuery({
    queryKey: ["favourite_books", user?.email, 1],
    queryFn: () =>
      favouriteBooksRequest({
        page: 1,
        perPage: BOOKS_PER_PAGE,
        searchQuery: "",
        sortBy: SORT_BY_OPTIONS[0],
        genres: [],
        languages: [],
      }),
  });

  if (isShelvesPending || isFavPending) return <Loading />;

  if (shelvesError) return <Error message="No se pudo cargar la biblioteca." />;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 space-y-12">
      {/* Page Title */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-serif text-[#3e322c] tracking-wide font-normal mb-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          My Library
        </h1>
        <hr className="border-t border-[#e6decb]" />
      </div>

      {/* Favourites Section */}
      <div className="space-y-4 text-left">
        <h2
          className="text-lg font-serif text-[#3e322c] uppercase tracking-widest font-semibold"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Favourites
        </h2>
        <BookCollectionButton
          books={paginatedFavouriteBooks?.books}
          url="/favourites"
        />
      </div>

      {/* Book Shelves Section */}
      <div className="space-y-6 text-left">
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-serif text-[#3e322c] uppercase tracking-widest font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Book Shelves
          </h2>
          <button
            className="bg-white border border-[#d6ccb8] hover:border-[#5a4a42] text-[#5a4a42] hover:bg-[#5a4a42] hover:text-[#f7f4ec] text-xs font-sans uppercase tracking-wider py-1.5 px-3.5 rounded-sm flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            onClick={() => setIsCreateShelfModalOpen(true)}
            title="Create new Book Shelf"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Shelf</span>
          </button>
        </div>

        {/* List of Shelves */}
        <div className="space-y-8">
          {shelves?.map(
            (shelf: { id: string; name: string; books?: any[] }) => (
              <div key={shelf.id || shelf.name} className="space-y-3 text-left">
                <h3 className="font-serif text-sm italic text-[#7a6b63] uppercase tracking-wider">
                  {shelf.name}
                </h3>
                <BookCollectionButton
                  books={shelf.books}
                  url={`/bookshelf/${shelf.name}`}
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Create Shelf Modal */}
      <CreateShelfModal
        isOpen={isCreateShelfModalOpen}
        setIsOpen={setIsCreateShelfModalOpen}
        refetch={refetch}
      />
    </div>
  );
}
