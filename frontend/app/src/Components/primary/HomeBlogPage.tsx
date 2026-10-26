import { useQuery } from "@tanstack/react-query";
import { postsRequest } from "../../Services/api/service";

export default function HomeBlogPage() {
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postsRequest(),
  });

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h1>Blog Page</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col items-center group cursor-pointer"
        >
          <h2>Post title: {post.title}</h2>
          <div className="w-70">
            <img
              src={post.image_url}
              alt={`Portada de ${post.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
