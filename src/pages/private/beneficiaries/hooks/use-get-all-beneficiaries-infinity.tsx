import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedResponseType } from "@/types/api";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetAllBeneficiariesInfinity = ({
  enabled = false,
  per_page = 8,
}: {
  enabled: boolean;
  per_page: number;
}) => {
  const { getRequest } = useAxiosBase();

  return useInfiniteQuery({
    queryKey: ["GET_ALL_BENEFICIARIES", per_page],
    queryFn: ({ pageParam = 1 }) =>
      getRequest(`/beneficiaries?page=${pageParam}&per_page=${per_page}`).then(
        (res: PaginatedResponseType<BeneficiariesParams>) => res.data
      ),
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllBeneficiariesInfinity;
