import { Section } from "../../home/components";
import TableOfContent from "./components/TableOfContent";
import Content from "./components/Content";
import type { BlogParams } from "@/types/blogs";

const BlogContent = ({
  blog,
  isLoading,
}: {
  blog: BlogParams;
  isLoading: boolean;
}) => {
  return (
    <Section className="md:pb-10">
      <div className="grid md:grid-cols-3 gap-5 bg-[#EFEFEF] p-4 rounded-2xl">
        <div className="order-2 md:order-1 md:col-span-2">
          <Content blog={blog} isLoading={isLoading} />
        </div>

        <div className="order-1 md:order-2">
          <TableOfContent />
        </div>
      </div>
    </Section>
  );
};

export default BlogContent;
