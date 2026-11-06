import { Link } from "react-router";
import type { PostType } from "../../Models/post";
import { dateTimeValidation } from "../../Utils/dateTimeValidation";
import { UserCircle, BookOpen, Clock } from "lucide-react";

interface PostCardProps {
  post: PostType;
}

export default function PostCard(props: PostCardProps) {
  return (
    <article className="w-full pb-10 mb-10 border-b border-[#e6decb] flex flex-col space-y-4 text-left">
      {/* Header: User details, Timestamp & Book Reference */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-[#f0ece1] border border-[#d6ccb8] rounded-full flex items-center justify-center text-[#5a4a42] shrink-0">
            <UserCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-semibold text-[#3e322c]">
              {props.post.user.first_name} {props.post.user.last_name}
            </h3>
            <span className="flex items-center space-x-1 text-[11px] font-sans text-[#7a6b63] tracking-wider uppercase mt-0.5">
              <Clock className="w-3 h-3 text-[#a69b90]" />
              <span>{dateTimeValidation(props.post.posted_at)}</span>
            </span>
          </div>
        </div>

        {/* Referenced Book Badge (Acts as a Link Button) */}
        {props.post.book && (
          <Link
            to={`/book/${props.post.book.id}`}
            className="flex items-center space-x-2.5 bg-white/60 hover:bg-white border border-[#d6ccb8] hover:border-[#5a4a42] px-3 py-1.5 rounded-sm transition-all group shrink-0 shadow-2xs"
          >
            <div className="w-6 aspect-[2/3] bg-white border border-[#d6ccb8] overflow-hidden rounded-xs shrink-0 shadow-2xs">
              <img
                src={props.post.book.cover_url}
                alt={`Portada de ${props.post.book.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-[120px] sm:max-w-[160px] text-left">
              <span className="block text-[9px] uppercase font-sans tracking-widest text-[#8a7a70] flex items-center gap-1">
                <BookOpen className="w-2.5 h-2.5" /> Book
              </span>
              <h4 className="text-xs font-serif font-semibold text-[#3e322c] truncate group-hover:text-black">
                {props.post.book.title}
              </h4>
            </div>
          </Link>
        )}
      </div>

      {/* Post Content Body */}
      <div className="space-y-2 pt-1">
        <h2
          className="text-xl md:text-2xl font-serif text-[#3e322c] font-normal leading-tight"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {props.post.title}
        </h2>

        <p className="font-serif text-sm md:text-base text-[#5a4a42] leading-relaxed whitespace-pre-line">
          {props.post.content}
        </p>
      </div>

      {/* Post Attached Image (Optional) */}
      {props.post.image_url && (
        <div className="w-full aspect-video md:aspect-[21/9] rounded-sm border border-[#d6ccb8] overflow-hidden bg-white/40 shadow-inner mt-2">
          <img
            src={props.post.image_url}
            alt={`Imagen de ${props.post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </article>
  );
}
