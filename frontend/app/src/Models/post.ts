import z from "zod";

// FROM SERVER

export const postSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  image_url: z.string(),
  posted_at: z.iso.datetime(),
});

export type PostType = z.infer<typeof postSchema>;

// TO SERVER

export interface NewPostRequestDTO {
  title: string;
  content: string;
  image_url: string;
  book_id: string;
}
