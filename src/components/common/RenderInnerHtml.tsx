import { cn } from "@/utils/class-name";

const RenderInnerHtml = ({
  html,
  className,
}: {
  html: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none",

        // Tighten vertical spacing
        "prose-p:my-2 prose-li:my-1 prose-ul:my-2 prose-ol:my-2 prose-h1:my-3 prose-h2:my-3 prose-h3:my-2 prose-h4:my-2",

        // Paragraphs
        "prose-p:text-[14px] prose-p:leading-[1.5] prose-p:text-charcoalGray",

        // Lists
        "prose-ul:pl-5 prose-ul:list-disc prose-li:marker:text-primary prose-li:text-[14px] prose-li:text-charcoalGray",

        // Headings
        "prose-h1:text-[24px] prose-h2:text-[20px] prose-h3:text-[18px] prose-h4:text-[16px] prose-headings:text-black",

        // Links
        "prose-a:text-primary prose-a:underline",

        // Others
        "prose-strong:font-semibold prose-img:rounded-lg",

        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RenderInnerHtml;
