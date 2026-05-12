import axios from "axios";
import type {
  GetTokensBody,
  TypingTokenData,
} from "../types/typingTokenData";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchTokens = async (
  body: GetTokensBody
): Promise<TypingTokenData[]> => {
  const response = await axios.post(
    `${VITE_API_URL}/tokens`,
    body
  );

  return response.data;
};