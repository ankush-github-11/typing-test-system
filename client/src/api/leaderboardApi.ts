import axios from "axios";
import type { LeaderboardData } from "../types/leaderboardData";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchLeaderboardData = async (): Promise<LeaderboardData[]> => {
  const response = await axios.get(`${VITE_API_URL}/leaderboard`);
  return response.data.data;
};