import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../Contexts/AuthContext";
import { myPostsRequest } from "../../Services/api/service";
import PostGrid from "../../Components/ui/PostGrid";

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

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h1>My Posts Section</h1>
      <PostGrid posts={posts} />
    </div>
  );
}
