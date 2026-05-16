import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupApi } from "../api/signupApi";
import type { SignupData } from "../types/signupData";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (data: SignupData) => signupApi(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      console.log("Signup Success", data);
      navigate("/");
    },

    onError: (error) => {
      console.log("Signup Failed", error);
    },
  });
};
