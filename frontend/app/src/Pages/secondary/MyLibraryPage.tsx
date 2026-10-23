import { useState } from "react";
import { useNavigate } from "react-router";
import CreateShelfModal from "../../Components/ui/CreateShelfModal";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { shelvesRequest } from "../../Services/api/service";

export default function MyLibraryPage() {
  const [isCreateShelfModalOpen, setIsCreateShelfModalOpen] =
    useState<boolean>(false);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {
    data: shelves,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shelves", user?.email],
    queryFn: shelvesRequest,
  });

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h2>My Library</h2>

      <button
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        onClick={() => navigate("/favourites")}
      >
        Favourites
      </button>

      <h2>Book Shelves</h2>

      <div>
        {shelves.map((shelf) => (
          <div>
            <button onClick={() => navigate(`/bookshelf/${shelf.name}`)}>
              <div
                key={shelf.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <h1>{shelf.name}</h1>
              </div>
            </button>
          </div>
        ))}
      </div>

      <button
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        onClick={() => setIsCreateShelfModalOpen(true)}
      >
        Create new Book Shelf
      </button>

      <section>
        <CreateShelfModal
          isOpen={isCreateShelfModalOpen}
          setIsOpen={setIsCreateShelfModalOpen}
          refetch={refetch}
        />
      </section>
    </div>
  );
}
