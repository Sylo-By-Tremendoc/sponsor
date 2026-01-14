import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedData } from "@/types/api";
import type { SubscriptionPlan } from "@/types/plans";
import { useQuery } from "@tanstack/react-query";

const useGetSingleBeneficiaryPlan = (enabled: boolean, id: string) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_SINGLE_BENEFICIARY_PLAN", id],
    queryFn: () =>
      getRequest(`/beneficiaries/${id}/packages`).then(
        (res: PaginatedData<SubscriptionPlan>) => res?.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetSingleBeneficiaryPlan;
