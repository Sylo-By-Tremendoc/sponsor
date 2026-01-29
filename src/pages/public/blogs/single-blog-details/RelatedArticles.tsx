import { useNavigate, useParams } from "react-router-dom";
import { Section, TitleText } from "../../home/components";
import { BlogCard, BlogCardLoader } from "../../home/components/BlogCard";
import { useSetPagination } from "@/hooks/use-set-pagination";
import NetworkError from "@/pages/error/NetworkError";
import EmptyState from "@/components/common/EmptyState";
import useGetRelatedBlog from "../hooks/use-get-related-blog";

const RelatedArticles = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pagination = useSetPagination({ defaultPerPage: 3 });

  const { data, isLoading, isFetching, refetch, error } = useGetRelatedBlog({
    enabled: !!id,
    id: id!,
    page: pagination?.page,
    per_page: pagination?.per_page,
  });

  console.log("DATA", data)

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Section className="md:pt-10 space-y-3">
      <TitleText className="m-0">Related Articles</TitleText>

      {isLoading || isFetching ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <BlogCardLoader key={index} />
          ))}
        </div>
      ) : data?.data?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.data?.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onClick={(id) => navigate(`/blogs/${id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Related Articles"
          description="There are no related articles available at the moment. Check back later for more insights."
          iconName="document-text"
        />
      )}
    </Section>
  );
};

export default RelatedArticles;
