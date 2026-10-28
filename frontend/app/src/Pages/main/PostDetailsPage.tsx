import { Link, useParams } from "react-router";
import { postRequest } from "../../Services/api/service";
import { useQuery } from "@tanstack/react-query";
import { dateTimeValidation } from "../../Utils/dateTimeValidation";

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

  if (isPending) return <h1>Loading...</h1>;

  if (error || !id) return <h1>Error</h1>;

  return (
    <div>
      <Link to={`/book/${post.book.id}`}>
        <h3>Book: {post.book.title}</h3>
        <div className="w-20">
          <img
            src={post.book.cover_url}
            alt={`Portada de ${post.book.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <h3>{post.title}</h3>
      <h4>{dateTimeValidation(post.posted_at)}</h4>
      <div className="w-150">
        <img
          src={post?.image_url}
          alt={`Portada de ${post?.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3>{post.content}</h3>
    </div>
  );
}
