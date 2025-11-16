import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAccount = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const createAccount = useMutation({
    mutationKey: ["CREATE_ACCOUNT"],
    mutationFn: (data) => postRequest("/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CREATE_ACCOUNT"] });
    },
  });

  return createAccount;
};

export default useCreateAccount;
