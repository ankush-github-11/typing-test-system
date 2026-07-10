import axios from "axios";
import type { timeTypingData } from "../types/timeTypingData";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const postTimeTyping = async (
  body: timeTypingData,
): Promise<number> => {
  const response = await axios.post(`${VITE_API_URL}/timeTyping`, body);

  return response.status;
};