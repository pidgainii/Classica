import { postRequest } from "./api";

export async function register() {
  postRequest("/register");
}
