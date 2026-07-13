import axios from "axios";
import type { totalCharsTypedData } from "../types/totalCharsTypedData";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const postTotalCharsTyped = async (
  body: totalCharsTypedData,
): Promise<number> => {
  const response = await axios.post(`${VITE_API_URL}/totalCharsTyped`, body);

  return response.status;
};