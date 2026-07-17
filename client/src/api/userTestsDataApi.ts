import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
export const getUserTests = async (id: number) => {
  const response = await axios.get(
    `${VITE_API_URL}/userTestsData/${id}`,
    {
      withCredentials: true,
    }
  );

  return response.data.data;
};