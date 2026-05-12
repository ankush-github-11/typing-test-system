import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "../api/tokenApi";

import type { DifficultyType, TokenType, TypingTokenData } from "../types/typingTokenData";

interface UseTokensProps {
  token_type: TokenType[];
  difficulty: DifficultyType[];
}

export const useTokens = ({
  token_type,
  difficulty,
}: UseTokensProps) => {
  return useQuery<TypingTokenData[]>({
    queryKey: ["tokens", token_type, difficulty],

    queryFn: () =>
      fetchTokens({
        token_type,
        difficulty,
      }),

    staleTime: 1000 * 60 * 5,
  });
};