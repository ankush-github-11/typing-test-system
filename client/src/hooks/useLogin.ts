import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/loginApi";
import type { SignupData } from "../types/signupData";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupData) => loginApi(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      console.log("Login Success", data);
      navigate("/");
    },

    onError: (error) => {
      console.log("Login Failed", error);
    },
  });
};
