import type { Book } from "../../Models/book";
import type { User, UserLogin } from "../../Models/user";
import api from "./api";

///////////////////////////////////////////////////
// TODO: Create error handling system
///////////////////////////////////////////////////

export const loginRequest = async (user: UserLogin) => {
  try {
    const { data: result } = await api.post("/auth/login", {
      email: user.email,
      password: user.password,
    });

    return result.access_token;
  } catch (error: any) {
    return null;
  }
};

export const logoutRequest = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error: any) {
    return null;
  }
};

export const currentUserRequest = async () => {
  try {
    const { data: result } = await api.get("/auth/me");

    let user: User = {
      id: result.id,
      email: result.email,
      first_name: result.first_name,
      last_name: result.last_name,
    };

    return user;
  } catch (error: any) {
    return null;
  }
};

export const tenBooksRequest = async (): Promise<Book[] | null> => {
  try {
    const { data: result } = await api.get("items/ten-books");
    return result;
  } catch (error: any) {
    return null;
  }
};

export const bookRequest = async (id: string): Promise<Book | null> => {
  try {
    const { data: result } = await api.get("items/book", { params: id });
    return result;
  } catch (error: any) {
    return null;
  }
};
