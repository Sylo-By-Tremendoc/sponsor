import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useInviteBenefactors = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const inviteBenefactors = useMutation({
    mutationKey: ["INVITE_BENEFACTORS"],
    mutationFn: (data) => postRequest("/shared-payments", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["INVITE_BENEFACTORS"],
      });
    },
  });

  return inviteBenefactors;
};

export default useInviteBenefactors;
