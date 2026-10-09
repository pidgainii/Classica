import z from "zod";

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  language: z.string().nullish(),
  isbn: z.string().nullish(),
  cover_url: z.string().optional(),
});

export type BookType = z.infer<typeof bookSchema>;

export const booksPaginatedSchema = z.object({
  pages: z.int(),
  books: z.array(bookSchema),
});

export type BooksPaginatedType = z.infer<typeof booksPaginatedSchema>;
