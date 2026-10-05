import type { Response } from "../../Models/result";
import type { UserLoginType } from "../../Models/user";
import { userSchema } from "../../Models/user";
import { bookSchema } from "../../Models/book";
import { tokenSchema } from "../../Models/token";
import { getMethod, postMethod } from "./fetch";

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

export const tenBooksRequest = async (): Promise<Response> => {
  return await getMethod("/items/ten-books", bookSchema.array());
};

export const bookRequest = async (id: string): Promise<Response> => {
  return await getMethod(`items/book/${id}`, bookSchema);
};
