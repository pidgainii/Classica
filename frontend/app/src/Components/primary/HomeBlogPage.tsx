import { useInfiniteQuery } from "@tanstack/react-query";
import { postsRequest } from "../../Services/api/service";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostCard from "../ui/PostCard";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { Loader2 } from "lucide-react";

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

  if (isPending) return <Loading />;

  if (error)
    return <Error message="Posts could not be loaded. Try again later." />;

  return (
    <div className="w-full bg-[#f7f4ec] min-h-screen py-10 px-4 md:px-8 flex flex-col items-center">
      {/* Infinite Scroll Post Cards Feed */}
      <div className="w-full max-w-3xl flex flex-col space-y-8">
        {posts.pages.map((page) => (
          <div
            key={page.current_page}
            className="w-full flex flex-col space-y-8"
          >
            {page.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Loading Indicator for Infinite Scroll */}
      <div ref={ref} className="py-10 flex justify-center items-center w-full">
        {isFetchingNextPage && (
          <div className="flex items-center space-x-2 text-[#5a4a42] text-xs font-serif uppercase tracking-widest">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading more posts...</span>
          </div>
        )}
      </div>
    </div>
  );
}
