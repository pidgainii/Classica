import z from "zod";
import { userSchema } from "./user";
import { bookSchema } from "./book";

// FROM SERVER

export const postSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  image_url: z.string(),
  posted_at: z.iso.datetime(),
  user: userSchema,
  book: bookSchema,
});

export type PostType = z.infer<typeof postSchema>;

export const postsPaginatedSchema = z.object({
  current_page: z.int(),
  next_page: z.int().nullable(),
  posts: z.array(postSchema),
});

export type PostsPaginatedType = z.infer<typeof postsPaginatedSchema>;

// TO SERVER

export interface NewPostRequestDTO {
  title: string;
  content: string;
  image_url: string;
  book_id: string;
}
