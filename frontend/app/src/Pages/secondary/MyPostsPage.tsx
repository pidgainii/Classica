import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { myPostsRequest } from "../../Services/api/service";
import { Link } from "react-router";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { FileText } from "lucide-react";

export default function MyPostsPage() {
  const { user } = useAuthContext();

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["my-posts", user?.email],
    queryFn: () => myPostsRequest(),
  });

  if (isPending) return <Loading />;

  if (error)
    return <Error message="No se pudieron cargar tus publicaciones." />;

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-6 space-y-8">
      {/* Section Title */}
      <div className="text-left">
        <p className="text-xs font-sans text-[#7a6b63] uppercase tracking-wider">
          {posts?.length || 0}{" "}
          {posts?.length === 1 ? "Publication" : "Publications"}
        </p>
        <hr className="border-t border-[#e6decb] mt-3" />
      </div>

      {/* Posts Grid */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map(
            (post: { id: string; image_url: string; title: string }) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="group relative aspect-square bg-white border border-[#d6ccb8] rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer block"
              >
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#f0ece1] flex flex-col items-center justify-center p-4 text-[#7a6b63]">
                    <FileText className="w-8 h-8 mb-2 opacity-60" />
                    <span className="font-serif text-xs uppercase tracking-wider text-center">
                      No image
                    </span>
                  </div>
                )}

                {/* Hover Overlay with Post Title */}
                <div className="absolute inset-0 bg-[#3e322c]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                  <h3 className="font-serif text-sm md:text-base text-[#f7f4ec] font-normal tracking-wide line-clamp-3">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div className="py-20 text-center text-[#7a6b63] font-serif text-sm">
          You haven't created any posts yet.
        </div>
      )}
    </div>
  );
}
