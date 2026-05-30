import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTestsData, postTestsData } from "../api/testsApi";
import type { TestsData } from "../types/testsData";

export const useTests = () => {
  const queryClient = useQueryClient();

  // GET QUERY
  const {
    data: tests,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tests"],
    queryFn: fetchTestsData,
  });

  // POST MUTATION
  const addTestMutation = useMutation<
    TestsData,
    Error,
    Omit<TestsData, "testid" | "created_at">
  >({
    mutationFn: postTestsData,
    onSuccess: () => {
      // Refresh tests after successful POST
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
  });

  return {
    tests,
    isLoading,
    isError,
    error,
    refetch,
    addTest: addTestMutation.mutate,
    isAddingTest: addTestMutation.isPending,
  };
};
