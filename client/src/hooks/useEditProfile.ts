import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "../api/editProfileApi";
import type { editProfileData } from "../types/editProfileData";

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateProfile,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (body: editProfileData) => editProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return {
    updateProfile,
    isPending,
    isError,
    error,
    isSuccess,
  };
};