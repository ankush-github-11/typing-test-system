import axios from "axios";
import type { SignupData } from "../types/signupData";

export const signupApi = async ({ email, password }: SignupData) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const response = await axios.post(
    `${VITE_API_URL}/auth/signup`,
    { email, password },
    { withCredentials: true },
  );
  if (!response.data) {
    throw new Error("Signup failed");
  }
  return response.data;
};
