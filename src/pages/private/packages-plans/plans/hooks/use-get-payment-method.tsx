import useAxiosBase from "@/hooks/use-axios-base";
import type { SingleResponseType } from "@/types/api";
import type { PlansParam } from "@/types/plans";
import { useQuery } from "@tanstack/react-query";

const useGetPaymentMethod = (enabled: boolean) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_PAYMENT_METHOD"],
    queryFn: () =>
      getRequest(`/billing/payment-methods`).then(
        (res: SingleResponseType<PlansParam>) => res?.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetPaymentMethod;
