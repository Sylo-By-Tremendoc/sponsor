import { motion } from "motion/react";
import Pill from "../../../components/common/Pill";
import { Button } from "../../../components/common/Button";
import { Section, TitleText } from "./components";
import BlogComingSoon from "../blogs/components/BlogComingSoon";
import { useNavigate } from "react-router-dom";
import { useSetPagination } from "@/hooks/use-set-pagination";
import useGetAllBlogs from "../blogs/hooks/use-get-all-blogs";
import NetworkError from "@/pages/error/NetworkError";
import { BlogCard, BlogCardLoader } from "./components/BlogCard";

const Blogs = () => {
  const navigate = useNavigate();

  const pagination = useSetPagination({ defaultPerPage: 3 });

  const { data, isLoading, isFetching, refetch, error } = useGetAllBlogs({
    enabled: true,
    page: pagination?.page,
    per_page: pagination?.per_page,
  });

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Section className="bg-[#F9F9FB]">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-5">
        <div className="space-y-4">
          <Pill text="OUR BLOGS" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TitleText className="mb-0">Latest insights and trends</TitleText>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:block"
        >
          <Button onClick={() => navigate("/blogs")}>
            View More Blog Posts
          </Button>
        </motion.div>
      </div>

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
        <BlogComingSoon className="p-5" />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex md:hidden mt-10"
      >
        <Button onClick={() => navigate("/blogs")} className="mx-auto">
          View More Blog Posts
        </Button>
      </motion.div>
    </Section>
  );
};

export default Blogs;
