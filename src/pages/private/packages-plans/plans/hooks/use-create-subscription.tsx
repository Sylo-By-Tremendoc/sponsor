import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateSubscription = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const createSubscription = useMutation({
    mutationKey: ["CREATE_PLAN_SUBSCRIPTION"],
    mutationFn: (data) =>
      postRequest("/subscriptions/with-payment-method", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CREATE_PLAN_SUBSCRIPTION"],
      });
    },
  });

  return createSubscription;
};

export default useCreateSubscription;
