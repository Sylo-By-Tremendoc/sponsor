import Pill from "@/components/common/Pill";
import { Section, TitleText } from "../home/components";
import { BlogCard, BlogCardLoader } from "../home/components/BlogCard";
import { useNavigate } from "react-router-dom";
import { useSetPagination } from "@/hooks/use-set-pagination";
import useGetAllBlogs from "./hooks/use-get-all-blogs";
import NetworkError from "@/pages/error/NetworkError";
import BlogComingSoon from "./components/BlogComingSoon";
import If from "@/components/common/If";
import Pagination from "@/components/common/Pagination";

const OurBlogs = () => {
  const navigate = useNavigate();

  const pagination = useSetPagination({ defaultPerPage: 9 });

  const { data, isLoading, isFetching, refetch, error } = useGetAllBlogs({
    enabled: true,
    page: pagination?.page,
    per_page: pagination?.per_page,
  });

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Section className="space-y-4">
      <Pill text="OUR BLOG" />
      <TitleText className="m-0">Explore Our Latest News & Insights</TitleText>

      {isLoading || isFetching ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <BlogCardLoader key={index} />
          ))}
        </div>
      ) : data?.data?.length ? (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.data?.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onClick={(id) => navigate(`/blogs/${id}`)}
              />
            ))}
          </div>

          <If condition={(data?.meta?.total || 0) > 9}>
            <Pagination
              totalEntries={data?.meta?.total || 0}
              pageSize={pagination.per_page}
              pageNumber={pagination.page || 1}
              onPageChange={pagination.handlePageChange}
            />
          </If>
        </div>
      ) : (
        <BlogComingSoon className="p-5" />
      )}
    </Section>
  );
};

export default OurBlogs;
