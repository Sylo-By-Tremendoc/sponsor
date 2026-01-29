import useAxiosBase from "@/hooks/use-axios-base";
import type { SingleResponseType } from "@/types/api";
import type { PaymentCardInfo } from "@/types/plans";
import { useQuery } from "@tanstack/react-query";

const useGetPaymentDetails = (enabled: boolean, id: string) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_BENEFACTOR_PAYMENT_DETAILS", id],
    queryFn: () =>
      getRequest(`/sponsors/${id}/payment-methods`).then(
        (res: SingleResponseType<PaymentCardInfo[]>) => res?.data,
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetPaymentDetails;
