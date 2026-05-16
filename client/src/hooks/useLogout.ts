import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api/logoutApi";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: () => logoutApi(),

    onSuccess: (data) => {
      queryClient.setQueryData(["me"], null);

      console.log("Logout Success", data);

      navigate("/");
    },

    onError: (error) => {
      console.log("Logout Failed", error);
    },
  });
};
