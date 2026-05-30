import axios from "axios";
import type { TestsData } from "../types/testsData";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchTestsData = async (): Promise<TestsData[]> => {
  const response = await axios.get(`${VITE_API_URL}/tests`);
  return response.data;
};
export const postTestsData = async (data: Omit<TestsData, "testid" | "created_at">): Promise<TestsData> => {
  const response = await axios.post(`${VITE_API_URL}/tests`, data);
  return response.data;
};
