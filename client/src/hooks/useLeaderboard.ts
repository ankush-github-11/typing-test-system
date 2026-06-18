import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboardData } from "../api/leaderboardApi";
import type { GetLeaderboardData } from "../types/getLeaderboardData";

export const useLeaderboard = ({duration, difficulty}: GetLeaderboardData) => {

  // GET QUERY
  const {
    data: leaderboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leaderboard", duration, difficulty],
    queryFn: () => fetchLeaderboardData({
      duration,
      difficulty
    }),
  });
  return {
    leaderboard,
    isLoading,
    isError,
    error,
    refetch,
  };
};