import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookRequest, createPostRequest } from "../../Services/api/service";
import { useState } from "react";

export default function CreatePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const onClickCancel = () => {
    navigate(`/book/${id}`);
  };

  const {
    data: book,
    isPending,
    error,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () => bookRequest(id),
    gcTime: 0,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      createPostRequest({
        title: title,
        content: content,
        image_url: imageUrl,
        book_id: id ? id : "",
      }),
    onSuccess: () => navigate("/profile/my-posts", { replace: true }),
  });

  if (isPending) return <h1>Loading...</h1>;

  if (error || !id) return <h1>Error</h1>;

  return (
    <div>
      <div className="w-15">
        <img
          src={book?.cover_url}
          alt={`Portada de ${book?.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2>{book?.title}</h2>

      <h1>New Post</h1>
      <div className="flex flex-col items-center justify-center">
        <input
          type="title"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          type="content"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Reflection"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <input
          type="imageUrl"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="image url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        ></input>
        <button
          onClick={() => mutate()}
          className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
        >
          Upload New Post
        </button>
        <button
          onClick={() => onClickCancel()}
          className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
