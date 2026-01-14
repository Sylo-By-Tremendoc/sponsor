import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";

export const DashboardCard = ({
  title,
  icon,
  count,
}: {
  title: string;
  icon: {
    name: string;
    color: string;
  };
  count: number;
}) => {
  return (
    <div className="flex flex-col gap-4 h-full p-4 border border-[#535353] bg-white rounded-2xl">
      <div className="flex justify-between items-center gap-5">
        <Typography variant={"mediumText"}>{title}</Typography>
        <div
          style={{ backgroundColor: icon?.color }}
          className="p-1.5 rounded-lg"
        >
          <Icons iconName={icon?.name} />
        </div>
      </div>

      <Typography variant={"xxlargeTextSemibold"}>{count}</Typography>
    </div>
  );
};

export const DashboardCardLoader = () => {
  return (
    <div className="flex flex-col gap-4 h-full p-4 border border-[#535353] rounded-2xl">
      <div className="flex justify-between items-center gap-5">
        <SkeletonLoader className="h-4 w-32 rounded" />
        <SkeletonLoader className="h-7 w-7 rounded-lg" />
      </div>

      <SkeletonLoader className="h-10 w-24 rounded" />
    </div>
  );
};
