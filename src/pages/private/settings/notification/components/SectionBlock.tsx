import Typography from "@/components/common/Typography";
import { cn } from "@/utils/class-name";

const SectionBlock = ({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:grid-cols-3 gap-5 border-b border-mid-grey py-6 space-y-4",
        className
      )}
    >
      <div>
        <Typography variant={"smallTextSemibold"}>{title}</Typography>
        <Typography variant={"xSmallText"} className="text-charcoal-gray">
          {description}
        </Typography>
      </div>

      <div className="md:col-span-2 space-y-4">{children}</div>
    </div>
  );
};

export default SectionBlock;
