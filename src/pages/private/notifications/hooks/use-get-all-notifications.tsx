import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { NotificationParams } from "..";
import type { PaginatedResponseType } from "@/types/api";

export type PaginatedProps = {
  enabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  type?: string;
};
const useGetAllNotification = ({
  enabled = false,
  pageNumber = 1,
  pageSize = 5,
  search = "",
  type = "",
}: PaginatedProps) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_ALL_NOTIFICATIONS", pageNumber, pageSize, search, type],
    queryFn: () =>
      getRequest(
        `/notifications?type=${type}&read=${false}&pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
      ).then(
        (res: PaginatedResponseType<NotificationParams>) => res.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllNotification;
