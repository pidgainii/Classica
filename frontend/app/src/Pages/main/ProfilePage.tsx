import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useEffect } from "react";
import ProfileNavigationBar from "../../Components/ui/ProfileNavigationBar";
import { Home, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    const result = await logout();
    if (result.success) navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-[#f7f4ec] text-[#3e322c] flex flex-col">
      {/* Top Header Bar with Home (Left) and Log Out (Right) */}
      <div className="w-full py-4 px-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#5a4a42] hover:text-black transition-colors cursor-pointer"
          title="Home"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <button
          onClick={onClickLogout}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#5a4a42] hover:text-black transition-colors cursor-pointer"
          title="Log out"
        >
          <span className="hidden sm:inline">Log out</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Centered Welcome Message */}
      <div className="w-full text-center py-6 px-4">
        <h1
          className="text-3xl md:text-4xl font-serif text-[#3e322c] tracking-wide font-normal"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Welcome back, {user?.first_name}
        </h1>
      </div>

      <ProfileNavigationBar />

      {/* Nested Subpages (e.g. MyProfilePage, Library, Posts, Settings) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
