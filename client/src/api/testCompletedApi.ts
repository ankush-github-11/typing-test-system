import axios from "axios";
import type { testCompletedData } from "../types/testCompletedData";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const postTestCompleted = async (
  body: testCompletedData,
): Promise<number> => {
  const response = await axios.post(`${VITE_API_URL}/testCompleted`, body);

  return response.status;
};