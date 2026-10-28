import { Link } from "react-router";
import type { PostType } from "../../Models/post";

interface PostGridProps {
  posts: PostType[];
}

export default function PostGrid(props: PostGridProps) {
  return (
    <div>
      <h1>Post Grid</h1>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
        {props.posts.map((post) => (
          <Link to={`/post/${post.id}`}>
            <div className="relative rounded overflow-hidden">
              <img src={post.image_url} alt={post.title} className="w-full" />
              <p className="cursor-pointer absolute inset-0 bg-opacity-20 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
