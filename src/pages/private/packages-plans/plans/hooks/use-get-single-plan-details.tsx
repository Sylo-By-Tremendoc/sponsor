import useAxiosBase from "@/hooks/use-axios-base";
import type { SingleResponseType } from "@/types/api";
import type { SinglePlanDetailsParams } from "@/types/plans";
import { useQuery } from "@tanstack/react-query";

const useGetSinglePlanDetails = (enabled: boolean, id: string) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_SINGLE_PLAN_DETAILS", id],
    queryFn: () =>
      getRequest(`/plans/${id}/details`).then(
        (res: SingleResponseType<SinglePlanDetailsParams>) => res?.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetSinglePlanDetails;
