import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVerifySignupOTP = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const verifySignupOTP = useMutation({
    mutationKey: ["VERIFY_SIGNUP_OTP"],
    mutationFn: (data) => postRequest("/auth/verify-otp", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["VERIFY_SIGNUP_OTP"] });
    },
  });

  return verifySignupOTP;
};

export default useVerifySignupOTP;
