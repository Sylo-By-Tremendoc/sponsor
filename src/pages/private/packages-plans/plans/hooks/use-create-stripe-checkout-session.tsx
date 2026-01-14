import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateStripeCheckoutSession = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const createStripeCheckoutSession = useMutation({
    mutationKey: ["CREATE_STRIPE_CHECKOUT_SESSION"],
    mutationFn: (data) => postRequest("/checkout/sessions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CREATE_STRIPE_CHECKOUT_SESSION"],
      });
    },
  });

  return createStripeCheckoutSession;
};

export default useCreateStripeCheckoutSession;
