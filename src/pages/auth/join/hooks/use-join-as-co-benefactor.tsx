import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useJoinAsCoBenefactor = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const joinAsCoBenefactor = useMutation({
    mutationKey: ["SETUP_ACCOUNT"],
    mutationFn: (data) => postRequest("/auth/signup", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SETUP_ACCOUNT"] });
    },
  });

  return joinAsCoBenefactor;
};

export default useJoinAsCoBenefactor;
