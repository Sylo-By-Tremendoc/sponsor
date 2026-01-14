import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { NotificationParams } from "..";
import type { PaginatedResponseType } from "@/types/api";

export type PaginatedProps = {
  enabled?: boolean;
  page?: number;
  per_page?: number;
  filters?: Record<string, any>;
};

const useGetAllNotification = ({
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
    queryKey: ["GET_ALL_NOTIFICATIONS", page, per_page, filters],
    queryFn: () =>
      getRequest(`/notifications?${queryParams}`).then(
        (res: PaginatedResponseType<NotificationParams>) => res.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllNotification;
