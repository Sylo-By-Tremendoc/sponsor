import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";

export const AnalyticsCard = ({
  title,
  date,
  icon,
}: {
  title: string;
  date: string;
  icon: { name: string; bg: string; color: string };
}) => {
  return (
    <div className="space-y-2 bg-white p-3 rounded-2xl border border-mid-grey">
      <div className="flex justify-between items-center gap-5">
        <Typography variant={"smallText"} className="text-charcoal-gray">
          {title}
        </Typography>
        <div
          style={{ backgroundColor: icon?.bg }}
          className="inline-block rounded-lg p-1.5"
        >
          <Icons iconName={icon?.name} fill={icon?.color} />
        </div>
      </div>

      <Typography variant={"mediumTextSemibold"}>{date}</Typography>
    </div>
  );
};

export const AnalyticsCardLoader = () => {
  return (
    <div className="space-y-2 bg-white p-3 rounded-2xl border border-mid-grey animate-pulse">
      <div className="flex justify-between items-center gap-5">
        <SkeletonLoader className="h-4 w-24 rounded-md" />
        <SkeletonLoader className="h-7 w-7 rounded-lg" />
      </div>

      <SkeletonLoader className="h-5 w-32 rounded-md" />
    </div>
  );
};
