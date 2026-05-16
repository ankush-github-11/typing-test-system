import { useQuery } from "@tanstack/react-query";
import { meApi } from "../api/meApi";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: meApi,
    retry: false,
  });
};
