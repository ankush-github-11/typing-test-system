import { useQuery } from "@tanstack/react-query";
import { getUserTests } from "../api/userTestsDataApi";
import type { userTestsData } from "../types/userTestsData";

export const useUserTests = (id?: number) => {
  return useQuery<userTestsData[]>({
    queryKey: ["userTests", id],
    queryFn: () => getUserTests(id!),
    enabled: !!id,
  });
};