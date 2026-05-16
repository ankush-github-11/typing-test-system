import axios from "axios";

export const meApi = async () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const response = await axios.get(`${VITE_API_URL}/auth/me`, {
    withCredentials: true,
  });

  return response.data;
};
