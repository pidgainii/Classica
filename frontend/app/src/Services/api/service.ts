import type { Response } from "../../Models/result";
import type { UserLoginType } from "../../Models/user";
import { userSchema } from "../../Models/user";
import { bookSchema, type BookType } from "../../Models/book";
import { tokenSchema } from "../../Models/token";
import { getMethod, postMethod } from "./fetch";
import api from "./api";

export const loginRequest = async (user: UserLoginType): Promise<Response> => {
  return await postMethod("/auth/login", tokenSchema, {
    email: user.email,
    password: user.password,
  });
};

export const logoutRequest = async (): Promise<Response> => {
  return await postMethod("/auth/logout");
};

export const currentUserRequest = async (): Promise<Response> => {
  return await getMethod("/auth/me", userSchema);
};

export const bookRequest = async (id: any): Promise<BookType> => {
  const { data: result } = await api.get(`items/book/${id}`);
  return bookSchema.parse(result);
};

// OR JUST:
export const tenBooksRequest = async (): Promise<BookType[]> => {
  const { data: result } = await api.get("/items/ten-books");
  return bookSchema.array().parse(result);
};
