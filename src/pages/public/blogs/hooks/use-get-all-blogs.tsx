import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import type { PaginatedResponseType } from "@/types/api";
import type { BlogParams } from "@/types/blogs";

export type PaginatedProps = {
  enabled?: boolean;
  page?: number;
  per_page?: number;
};

const useGetAllBlogs = ({
  enabled = false,
  page = 1,
  per_page = 10,
}: PaginatedProps) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_ALL_BLOGS", page, per_page],
    queryFn: () =>
      getRequest(`/blogs?page=${page}&per_page=${per_page}`).then(
        (res: PaginatedResponseType<BlogParams>) => res.data,
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetAllBlogs;
