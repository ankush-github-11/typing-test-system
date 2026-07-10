import { useMutation } from "@tanstack/react-query";
import { postTimeTyping } from "../api/timeTypingApi";
import type { timeTypingData } from "../types/timeTypingData";

export const useTimeTyping = () => {
  const timeTypingMutation = useMutation<
    number,
    Error,
    timeTypingData
  >({
    mutationFn: (data: timeTypingData) => postTimeTyping(data),
  });

  return {
    timeTyping: timeTypingMutation.mutate
  };
};