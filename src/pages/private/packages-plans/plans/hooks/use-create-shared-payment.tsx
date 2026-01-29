import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateSharedPayment = (id: string) => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const createSharedPayment = useMutation({
    mutationKey: ["CREATE_PLAN_SHARED_PAYMENT"],
    mutationFn: (data) => postRequest(`/shared-payments/${id}/pay`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CREATE_PLAN_SHARED_PAYMENT"],
      });
    },
  });

  return createSharedPayment;
};

export default useCreateSharedPayment;
