import { Link } from "react-router";
import type { PostType } from "../../Models/post";
import { dateTimeValidation } from "../../Utils/dateTimeValidation";

interface PostCardProps {
  post: PostType;
}

export default function PostCard(props: PostCardProps) {
  return (
    <div>
      <div className="relative w-full aspect-[2/3] shadow-[5px_5px_15px_rgba(0,0,0,0.15)] group-hover:shadow-[5px_5px_20px_rgba(0,0,0,0.3)] transition-shadow duration-300 bg-white">
        <Link to={`/book/${props.post.book.id}`}>
          <h4>{props.post.book.title}</h4>
          <img
            src={props.post.book.cover_url}
            alt={`Portada de ${props.post.book.title}`}
            className="w-10"
          />
        </Link>
        <h3>{props.post.title}</h3>
        <h3>
          {props.post.user.first_name} {props.post.user.last_name}
        </h3>
        <h4>{dateTimeValidation(props.post.posted_at)}</h4>
        <img
          src={props.post.image_url}
          alt={`Portada de ${props.post.title}`}
          className="w-70"
        />
        <h4>{props.post.content}</h4>
      </div>
    </div>
  );
}
