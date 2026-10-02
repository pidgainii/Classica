import z from "zod";

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  language: z.string().nullish(),
  isbn: z.string().nullish(),
  cover_url: z.string().nullish(),
});

export type BookType = z.infer<typeof bookSchema>;
