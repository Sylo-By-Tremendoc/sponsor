import { TitleText } from "@/pages/public/home/components";
import blogImg from "../../../../../assets/images/blog-content-img.png";
import type { BlogParams } from "@/types/blogs";
import RenderInnerHtml from "@/components/common/RenderInnerHtml";
import SkeletonLoader from "@/components/common/SkeletonLoader";

const Content = ({
  blog,
  isLoading,
}: {
  blog: BlogParams;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <ContentSkeleton />;
  }

  return (
    <div className="md:col-span-2 space-y-5 p-3 bg-white rounded-2xl">
      <img
        src={blog?.main_attachment?.url || blogImg}
        alt={blog?.title}
        className="w-full h-60 rounded-2xl object-cover"
      />

      <article className="space-y-5">
        <TitleText className="m-0">{blog?.title}</TitleText>

        <RenderInnerHtml html={blog?.body} />
      </article>
    </div>
  );
};

export default Content;

const ContentSkeleton = () => {
  return (
    <div className="md:col-span-2 space-y-5 p-3 bg-white rounded-2xl animate-pulse">
      <SkeletonLoader className="w-full h-60 rounded-2xl" />

      <article className="space-y-4">
        <SkeletonLoader className="w-3/4 h-7 rounded-md" />

        <div className="space-y-3">
          <SkeletonLoader className="w-full h-4 rounded" />
          <SkeletonLoader className="w-full h-4 rounded" />
          <SkeletonLoader className="w-5/6 h-4 rounded" />
          <SkeletonLoader className="w-4/6 h-4 rounded" />
        </div>
      </article>
    </div>
  );
};
