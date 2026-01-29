import useAxiosBase from "@/hooks/use-axios-base";
import type { SingleResponseType } from "@/types/api";
import type { BlogParams } from "@/types/blogs";
import { useQuery } from "@tanstack/react-query";

const useGetSingleBlogDetails = (enabled: boolean, id: string) => {
  const { getRequest } = useAxiosBase();

  return useQuery({
    queryKey: ["GET_BLOG_SINGLE_DETAILS", id],
    queryFn: () =>
      getRequest(`/blogs/${id}`).then(
        (res: SingleResponseType<BlogParams>) => res?.data
      ),
    staleTime: 50000,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export default useGetSingleBlogDetails;
