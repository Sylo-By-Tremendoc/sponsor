import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedResponseType } from "@/types/api";
import type { BeneficiariesParams } from "@/types/beneficiary";

export type PaginatedProps = {
  enabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};
const useGetAllBeneficiaries = ({
  enabled = false,
  pageNumber = 1,
  pageSize = 5,
  search = "",
}: PaginatedProps) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_ALL_BENEFICIARIES", pageNumber, pageSize, search],
    queryFn: () =>
      getRequest(
        `/beneficiaries?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
      ).then((res: PaginatedResponseType<BeneficiariesParams>) => res.data),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllBeneficiaries;
