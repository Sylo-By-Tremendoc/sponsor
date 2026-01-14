import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRequestPlanPaymentOTP = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const requestPlanPaymentOTP = useMutation({
    mutationKey: ["REQUEST_PLAN_PAYMENT_OTP"],
    mutationFn: (data) =>
      postRequest("/billing/setup-intents/otp/request", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["REQUEST_PLAN_PAYMENT_OTP"] });
    },
  });

  return requestPlanPaymentOTP;
};

export default useRequestPlanPaymentOTP;
