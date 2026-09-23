import type { Book } from "../../models/book";
import { getRequest } from "./api";

export async function getBooks(): Promise<Book[]> {
  const data = getRequest("/items/ten-books");
  return data;
}
