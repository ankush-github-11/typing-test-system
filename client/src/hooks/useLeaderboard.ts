import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboardData } from "../api/leaderboardApi";

export const useLeaderboard = () => {

  // GET QUERY
  const {
    data: leaderboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboardData,
  });
  return {
    leaderboard,
    isLoading,
    isError,
    error,
    refetch,
  };
};