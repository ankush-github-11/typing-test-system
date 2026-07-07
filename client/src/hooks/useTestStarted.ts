import { useMutation } from "@tanstack/react-query";
import { postTestStarted } from "../api/testStartedApi";

export const useTestStarted = () => {
  const testStartedMutation = useMutation<
    number,
    Error,
    number
  >({
    mutationFn: (id: number) => postTestStarted({ id }),
  });

  return {
    startTest: testStartedMutation.mutate
  };
};