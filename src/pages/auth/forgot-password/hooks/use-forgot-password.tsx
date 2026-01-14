import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useForgotPassword = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const forgotPassword = useMutation({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: (data) => postRequest("/auth/password/email", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RESET_PASSWORD"] });
    },
  });

  return forgotPassword;
};

export default useForgotPassword;
