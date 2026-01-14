import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedResponseType } from "@/types/api";
import type { BeneficiariesParams } from "@/types/beneficiary";

export type PaginatedProps = {
  enabled?: boolean;
  page?: number;
  per_page?: number;
  filters?: Record<string, any>;
};

const useGetAllBeneficiaries = ({
  enabled = false,
  page = 1,
  per_page = 10,
  filters = {},
}: PaginatedProps) => {
  const { getRequest } = useAxiosBase();

  const queryParams = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined && v !== "")
    ),
  }).toString();

  return useQuery({
    queryKey: ["GET_ALL_BENEFICIARIES", page, per_page, filters],
    queryFn: () =>
      getRequest(`/beneficiaries?${queryParams}`).then(
        (res: PaginatedResponseType<BeneficiariesParams>) => res.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllBeneficiaries;
