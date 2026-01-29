import useAxiosBase from "@/hooks/use-axios-base";
import type { SingleResponseType } from "@/types/api";
import type { SharedPaymentDetails } from "@/types/plans";
import { useQuery } from "@tanstack/react-query";

const useGetInvitedBenefactorDetails = (enabled: boolean, id: string) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_INVITED_BENEFACTOR_DETAILS", id],
    queryFn: () =>
      getRequest(`/shared-payments/${id}`).then(
        (res: SingleResponseType<SharedPaymentDetails>) => res?.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetInvitedBenefactorDetails;
