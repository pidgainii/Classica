import type {
  UserLoginType,
  UserRegisterType,
  UserType,
} from "../../Models/user";
import { userSchema } from "../../Models/user";
import {
  bookSchema,
  booksPaginatedSchema,
  type BooksPaginatedType,
  type BooksSearchFiltersDTO,
  type BookType,
} from "../../Models/book";
import { tokenSchema, type TokenType } from "../../Models/token";
import api from "./api";
import z from "zod";
import { shelfSchema, type ShelfType } from "../../Models/shelf";
import {
  postSchema,
  postsPaginatedSchema,
  type NewPostRequestDTO,
  type PostsPaginatedType,
  type PostType,
} from "../../Models/post";
import { POSTS_PER_PAGE } from "../../Utils/Constants";

///////////////// AUTHENTICATION /////////////////

export const loginRequest = async (user: UserLoginType): Promise<TokenType> => {
  const { data: result } = await api.post("/auth/login", user);
  return tokenSchema.parse(result);
};

export const registerRequest = async (user: UserRegisterType) => {
  return await api.post("/auth/register", user);
};

export const logoutRequest = async () => {
  return await api.post("/auth/logout");
};

export const currentUserRequest = async (): Promise<UserType> => {
  const { data: result } = await api.get("/auth/me");
  return userSchema.parse(result);
};

///////////////// BOOKS /////////////////

export const bookRequest = async (id: any): Promise<BookType> => {
  const { data: result } = await api.get(`items/book/${id}`);
  return bookSchema.parse(result);
};

export const booksRequest = async (
  filters: BooksSearchFiltersDTO,
): Promise<BooksPaginatedType> => {
  const { data: result } = await api.post("/items/books", filters);
  return booksPaginatedSchema.parse(result);
};

export const favouriteBooksRequest = async (
  filters: BooksSearchFiltersDTO,
): Promise<BooksPaginatedType> => {
  const { data: result } = await api.post("/items/favourite-books", filters);
  return booksPaginatedSchema.parse(result);
};

export const isBookFavouriteRequest = async (id: any): Promise<boolean> => {
  const { data: result } = await api.get(`items/is-book-favourite/${id}`);
  return z.boolean().parse(result);
};

export const bookFavouriteRequest = async (id: any): Promise<boolean> => {
  const { data: result } = await api.post(`items/book-favourite/${id}`);
  return result;
};

///////////////// SHELVES /////////////////

export const createBookShelfRequest = async (
  name: string,
): Promise<ShelfType> => {
  const { data: result } = await api.post("/items/create-shelf", {
    name: name,
  });
  return shelfSchema.parse(result);
};

export const shelvesRequest = async (): Promise<ShelfType[]> => {
  const { data: result } = await api.get("/items/shelves");
  return shelfSchema.array().parse(result);
};

export const shelfBooksRequest = async (
  filters: BooksSearchFiltersDTO,
): Promise<BooksPaginatedType> => {
  const { data: result } = await api.post("/items/shelf-books", filters);
  return booksPaginatedSchema.parse(result);
};

export const isBookSavedRequest = async (
  shelf_name: string,
  book_id: any,
): Promise<boolean> => {
  const { data: result } = await api.get(
    `items/is-book-saved/?shelf_name=${shelf_name}&book_id=${book_id}`,
  );
  return z.boolean().parse(result);
};

export const bookSaveRequest = async (
  shelf_name: string,
  book_id: any,
): Promise<boolean> => {
  const { data: result } = await api.post(
    `items/save-book/?shelf_name=${shelf_name}&book_id=${book_id}`,
  );
  return result;
};

///////////////// POSTS /////////////////

export const createPostRequest = async (
  new_post_request: NewPostRequestDTO,
): Promise<PostType> => {
  const { data: result } = await api.post(
    "/items/create-post",
    new_post_request,
  );
  return postSchema.parse(result);
};

export const postsRequest = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<PostsPaginatedType> => {
  const { data: result } = await api.get(
    `/items/posts/?page=${pageParam}&perPage=${POSTS_PER_PAGE}`,
  );
  return postsPaginatedSchema.parse(result);
};

export const postRequest = async (id: any): Promise<PostType> => {
  const { data: result } = await api.get(`/items/post/${id}`);
  return postSchema.parse(result);
};

export const myPostsRequest = async (): Promise<PostType[]> => {
  const { data: result } = await api.get("/items/my-posts");
  return postSchema.array().parse(result);
};
