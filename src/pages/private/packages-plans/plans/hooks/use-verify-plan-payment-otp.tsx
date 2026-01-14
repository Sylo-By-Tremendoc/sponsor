import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVerifyPlanPaymentOTP = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const VerifyPlanPaymentOTP = useMutation({
    mutationKey: ["VERIFY_PLAN_PAYMENT_OTP"],
    mutationFn: (data) =>
      postRequest("/billing/setup-intents/otp/verify", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["VERIFY_PLAN_PAYMENT_OTP"] });
    },
  });

  return VerifyPlanPaymentOTP;
};

export default useVerifyPlanPaymentOTP;
