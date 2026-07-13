import { useMutation } from "@tanstack/react-query";
import { postTotalCharsTyped } from "../api/totalCharsTypedApi";
import type { totalCharsTypedData } from "../types/totalCharsTypedData";

export const useTotalCharsTyped = () => {
  const totalCharsTypedMutation = useMutation<
    number,
    Error,
    totalCharsTypedData
  >({
    mutationFn: (data: totalCharsTypedData) => postTotalCharsTyped(data),
  });

  return {
    totalCharsTyped: totalCharsTypedMutation.mutate
  };
};