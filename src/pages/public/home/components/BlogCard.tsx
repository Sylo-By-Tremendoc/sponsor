import Typography from "@/components/common/Typography";

export const BlogCard = ({
  id,
  image,
  title,
  description,
  author,
  authorAvatar,
  date,
  readTime,
  onClick,
}: {
  id: string;
  image: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  onClick?: (val: string) => void;
}) => {
  return (
    <article
      className="max-w-sm rounded-3xl bg-[#F6F5FA] overflow-hidden
        shadow-sm hover:shadow-md transition-all duration-300
        hover:-translate-y-1 p-2 space-y-2 cursor-pointer"
      onClick={() => onClick && onClick(id)}
    >
      <div className="h-40">
        <img
          src={image}
          alt={title}
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>

      <div className="p-1 space-y-2">
        <Typography
          variant={"mediumText"}
          className="text-gray-900 leading-snug"
        >
          {title}
        </Typography>

        <Typography
          variant={"smallText"}
          className="text-charcoal-gray leading-relaxed"
        >
          {description}
        </Typography>

        <div className="flex items-center gap-3 pt-2">
          <img
            src={authorAvatar}
            alt={author}
            className="w-8 h-8 rounded-full object-cover"
          />

          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700">{author}</p>
            <span>{date}</span>
            <span className="mx-1">·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
