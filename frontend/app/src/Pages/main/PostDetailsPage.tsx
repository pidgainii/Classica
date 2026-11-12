import { Link, useParams } from "react-router";
import { postRequest } from "../../Services/api/service";
import { useQuery } from "@tanstack/react-query";
import { dateTimeValidation } from "../../Utils/dateTimeValidation";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { UserCircle, BookOpen, Clock, ArrowLeft } from "lucide-react";

export default function PostDetailsPage() {
  const { id } = useParams();

  const {
    data: post,
    isPending,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => postRequest(id),
    gcTime: 0,
  });

  if (isPending) return <Loading />;

  if (error || !id)
    return <Error message="No se pudo cargar la publicación." />;

  return (
    <div>
      <div className="w-full py-4 px-8 flex justify-between items-center">
        {/* Back / Navigation link */}
        <div>
          <Link
            to="/profile/my-posts"
            className="inline-flex items-center space-x-1.5 text-xs font-sans uppercase tracking-wider text-[#7a6b63] hover:text-[#3e322c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>
        </div>
      </div>
      <article className="w-full min-h-screen bg-[#f7f4ec] py-12 px-6 md:px-16 flex flex-col items-center">
        <div className="max-w-3xl w-full flex flex-col space-y-8 text-left">
          {/* Post Header: Title & Metadata (Left Aligned) */}
          <div className="space-y-4 pb-6 border-b border-[#e6decb]">
            <h1
              className="text-3xl md:text-5xl font-serif text-[#3e322c] font-normal leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 text-xs font-sans text-[#7a6b63] uppercase tracking-widest pt-2">
              {post.user && (
                <div className="flex items-center space-x-1.5">
                  <UserCircle className="w-4 h-4 text-[#5a4a42]" />
                  <span className="font-semibold text-[#3e322c]">
                    {post.user.first_name} {post.user.last_name}
                  </span>
                </div>
              )}
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#a69b90]" />
                <span>{dateTimeValidation(post.posted_at)}</span>
              </div>
            </div>
          </div>

          {/* Referenced Book Card */}
          {post.book && (
            <div className="flex justify-start">
              <Link
                to={`/book/${post.book.id}`}
                className="flex items-center space-x-4 bg-white border border-[#d6ccb8] hover:border-[#5a4a42] p-4 rounded-sm shadow-xs hover:shadow-md transition-all group max-w-md w-full"
              >
                <div className="w-14 aspect-[2/3] bg-white border border-[#d6ccb8] overflow-hidden rounded-xs shrink-0 shadow-2xs">
                  <img
                    src={post.book.cover_url}
                    alt={`Portada de ${post.book.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#8a7a70] flex items-center gap-1 mb-0.5">
                    <BookOpen className="w-3 h-3" /> Featured Book
                  </span>
                  <h3 className="font-serif text-sm font-semibold text-[#3e322c] truncate group-hover:text-black">
                    {post.book.title}
                  </h3>
                </div>
              </Link>
            </div>
          )}

          {/* Post Attached Image */}
          {post.image_url && (
            <div className="w-full aspect-video md:aspect-[16/9] rounded-sm border border-[#d6ccb8] overflow-hidden bg-white shadow-inner">
              <img
                src={post.image_url}
                alt={`Imagen de ${post.title}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Content Body (Left Aligned) */}
          <div className="pt-4 pb-12">
            <p className="font-serif text-base md:text-lg text-[#5a4a42] leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
