import axios from "axios";
import type { testStartedData } from "../types/testStartedData";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const postTestStarted = async (
  body: testStartedData,
): Promise<number> => {
  const response = await axios.post(`${VITE_API_URL}/testStarted`, body);

  return response.status;
};