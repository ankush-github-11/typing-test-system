import axios from "axios";
export const logoutApi = async () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const response = await axios.post(
    `${VITE_API_URL}/auth/logout`,
    {},
    { withCredentials: true },
  );
  return response;
};
