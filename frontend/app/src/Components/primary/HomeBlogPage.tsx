import { useInfiniteQuery } from "@tanstack/react-query";
import { postsRequest } from "../../Services/api/service";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostCard from "../ui/PostCard";

export default function HomeBlogPage() {
  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: postsRequest,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next_page,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div className="flex flex-col gap-2">
      {posts.pages.map((page) => {
        return (
          <div
            key={page.current_page}
            className="flex flex-col items-center group cursor-pointer"
          >
            {page.posts.map((post) => {
              return <PostCard post={post}></PostCard>;
            })}
          </div>
        );
      })}

      <h1 ref={ref}>{isFetchingNextPage && "Loading..."}</h1>
    </div>
  );
}
