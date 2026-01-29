import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";
import type { BlogParams } from "@/types/blogs";
import { defaultImages } from "@/utils/constant";

export const BlogCard = ({
  blog,
  onClick,
}: {
  blog: BlogParams;
  onClick?: (id: string) => void;
}) => {
  return (
    <article
      className="max-w-sm rounded-3xl bg-[#F6F5FA] overflow-hidden border
        shadow-sm hover:shadow-md transition-all duration-300
        hover:-translate-y-1 p-2 space-y-2 cursor-pointer"
      onClick={() => onClick?.(blog.id)}
    >
      <div className="h-40">
        <img
          src={blog.main_attachment?.url || defaultImages?.blog}
          alt={blog.title}
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>

      <div className="p-1 space-y-2">
        <Typography
          variant="mediumText"
          className="text-gray-900 leading-snug line-clamp-2"
        >
          {blog.title}
        </Typography>

        <Typography
          variant="smallText"
          className="text-charcoal-gray leading-relaxed line-clamp-3"
        >
          {blog.excerpt}
        </Typography>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-white">
            {blog.author.name.charAt(0)}
          </div>

          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700">{blog.author.name}</p>
            {blog?.published_at && (
              <span>{new Date(blog.published_at)?.toLocaleDateString()}</span>
            )}

            <span className="mx-1">·</span>
            <span>{blog.reading_time} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};


export const BlogCardLoader = () => {
  return (
    <article className="max-w-sm rounded-3xl bg-[#F6F5FA] overflow-hidden p-2 space-y-2">
      <SkeletonLoader className="h-40 w-full rounded-3xl" />

      <div className="p-1 space-y-3">
        <SkeletonLoader className="h-5 w-3/4" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-5/6" />

        <div className="flex items-center gap-3 pt-2">
          <SkeletonLoader className="w-8 h-8 rounded-full" />
          <div className="space-y-1">
            <SkeletonLoader className="h-3 w-24" />
            <SkeletonLoader className="h-3 w-32" />
          </div>
        </div>
      </div>
    </article>
  );
};