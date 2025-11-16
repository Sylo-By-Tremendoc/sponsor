import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useResetPassword = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const resetPassword = useMutation({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: (data) => postRequest("/auth/password/email", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RESET_PASSWORD"] });
    },
  });

  return resetPassword;
};

export default useResetPassword;
