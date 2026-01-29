import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVerifyOTP = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const verifyOTP = useMutation({
    mutationKey: ["VERIFY_OTP"],
    mutationFn: (data) => postRequest("/auth/verify-otp", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["VERIFY_OTP"] });
    },
  });

  return verifyOTP;
};

export default useVerifyOTP;
