import { useMutation } from "@tanstack/react-query";
import { postTestCompleted } from "../api/testCompletedApi";

export const useTestCompleted = () => {
  const testCompletedMutation = useMutation<
    number,
    Error,
    number
  >({
    mutationFn: (id: number) => postTestCompleted({ id }),
  });

  return {
    completeTest: testCompletedMutation.mutate
  };
};