import axios from "axios";
import type { LoginData } from "../types/loginData";

export const loginApi = async ({ email, password }: LoginData) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const response = await axios.post(
    `${VITE_API_URL}/auth/login`,
    { email, password },
    { withCredentials: true },
  );
  if (!response.data) {
    throw new Error("Login failed");
  }
  return response.data;
};
