import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedResponseType } from "@/types/api";
import type { PlansParam } from "@/types/plans";

export type PaginatedProps = {
  enabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};
const useGetAllPlans = ({
  enabled = false,
  pageNumber = 1,
  pageSize = 5,
  search = "",
}: PaginatedProps) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_ALL_PLANS", pageNumber, pageSize, search],
    queryFn: () =>
      getRequest(
        `/plans?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
      ).then((res: PaginatedResponseType<PlansParam>) => res.data),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllPlans;
