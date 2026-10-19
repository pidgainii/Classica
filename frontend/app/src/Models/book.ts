import z from "zod";

// FROM SERVER

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string().nullish(),
  language: z.string().nullish(),
  isbn: z.string().nullish(),
  cover_url: z.string().optional(),
  genres: z.string().array(),
});

export type BookType = z.infer<typeof bookSchema>;

export const booksPaginatedSchema = z.object({
  pages: z.int(),
  books: z.array(bookSchema),
});

export type BooksPaginatedType = z.infer<typeof booksPaginatedSchema>;

export const bookIsFavouriteSchema = z.boolean();
export type BookIsFavouriteType = z.infer<typeof bookIsFavouriteSchema>;

// TO SERVER

export interface BooksSearchFiltersDTO {
  page: number;
  perPage: number;
  searchQuery: string;
  sortBy: string;
  genres: string[];
  languages: string[];
}
