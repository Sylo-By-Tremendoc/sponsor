import useAxiosBase from "@/hooks/use-axios-base";
import type { SingleResponseType } from "@/types/api";
import type { SingleBeneficiaryDetailsParams } from "@/types/beneficiary";
import { useQuery } from "@tanstack/react-query";

const useGetSingleBeneficiaryDetails = (enabled: boolean, id: string) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_SINGLE_BENEFICIARY_DETAILS", id],
    queryFn: () =>
      getRequest(`/beneficiaries/${id}`).then(
        (res: SingleResponseType<SingleBeneficiaryDetailsParams>) => res?.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetSingleBeneficiaryDetails;
