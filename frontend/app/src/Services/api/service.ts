import type {
  UserLoginType,
  UserRegisterType,
  UserType,
} from "../../Models/user";
import { userSchema } from "../../Models/user";
import {
  bookIsFavouriteSchema,
  bookSchema,
  booksPaginatedSchema,
  type BookIsFavouriteType,
  type BooksPaginatedType,
  type BooksSearchFiltersDTO,
  type BookType,
} from "../../Models/book";
import { tokenSchema, type TokenType } from "../../Models/token";
import api from "./api";

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

export const bookFavouriteRequest = async (
  id: any,
): Promise<BookIsFavouriteType> => {
  const { data: result } = await api.get(`items/book-favourite/${id}`);
  return bookIsFavouriteSchema.parse(result);
};
