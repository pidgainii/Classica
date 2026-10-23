import z from "zod";
import { bookSchema } from "./book";

export const shelfSchema = z.object({
  id: z.string(),
  name: z.string(),
  books: z.array(bookSchema),
});

export type ShelfType = z.infer<typeof shelfSchema>;
