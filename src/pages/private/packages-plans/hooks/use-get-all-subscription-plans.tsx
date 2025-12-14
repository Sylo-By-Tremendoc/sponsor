import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedResponseType } from "@/types/api";
import type { SubscriptionPlan } from "@/types/plans";

export type PaginatedProps = {
  enabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};
const useGetAllSubscriptionPlans = ({
  enabled = false,
  pageNumber = 1,
  pageSize = 5,
  search = "",
}: PaginatedProps) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_ALL_SUBSCRIPTION_PLANS", pageNumber, pageSize, search],
    queryFn: () =>
      getRequest(
        `/subscriptions?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
      ).then((res: PaginatedResponseType<SubscriptionPlan>) => res.data),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllSubscriptionPlans;
