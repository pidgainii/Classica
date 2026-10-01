import type { Book } from "../../Models/book";
import type { Result } from "../../Models/result";
import type { User, UserLogin } from "../../Models/user";
import api from "./api";

///////////////////////////////////////////////////
// TODO: Create error handling system
///////////////////////////////////////////////////

export const loginRequest = async (
  user: UserLogin,
): Promise<string | Result> => {
  try {
    const { data: result } = await api.post("/auth/login", {
      email: user.email,
      password: user.password,
    });
    return result.access_token;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};

export const logoutRequest = async (): Promise<Result> => {
  try {
    await api.post("/auth/logout");
    const result: Result = { success: true };
    return result;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};

export const currentUserRequest = async (): Promise<User | Result> => {
  try {
    const { data: result } = await api.get("/auth/me");
    return result;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};

export const tenBooksRequest = async (): Promise<Book[] | Result> => {
  try {
    const { data: result } = await api.get("items/ten-books");
    return result;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};

export const bookRequest = async (id: string): Promise<Book | Result> => {
  try {
    const { data: result } = await api.get("items/book", { params: { id } });
    return result;
  } catch (error: any) {
    const result: Result = { success: false };
    return result;
  }
};
