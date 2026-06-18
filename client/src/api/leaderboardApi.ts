import axios from "axios";
import type { LeaderboardData } from "../types/leaderboardData";
import type { GetLeaderboardData } from "../types/getLeaderboardData";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchLeaderboardData = async (
  body: GetLeaderboardData,
): Promise<LeaderboardData[]> => {
  const response = await axios.post(`${VITE_API_URL}/leaderboard`, body);
  return response.data.data;
};
