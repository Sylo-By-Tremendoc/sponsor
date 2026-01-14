import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";

export const RelationshipCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: { name: string; bg: string; color: string };
}) => {
  return (
    <div className="space-y-4 border border-mid-grey p-2 rounded-lg">
      <div
        style={{ backgroundColor: icon?.bg }}
        className="inline-block rounded-lg p-1.5"
      >
        <Icons iconName={icon?.name} fill={icon.color} />
      </div>

      <div className="space-y-1">
        <Typography variant={"xSmallText"} className="text-charcoal-gray">
          {title}
        </Typography>
        <Typography variant={"smallTextBold"}>{description}</Typography>
      </div>
    </div>
  );
};

export const RelationshipCardLoader = () => {
  return (
    <div className="space-y-4 border border-mid-grey p-2 rounded-lg animate-pulse">
      <SkeletonLoader className="w-8 h-8 rounded-lg" />

      <div className="space-y-2">
        <SkeletonLoader className="w-[85%] h-3 rounded-md" />
        <SkeletonLoader className="w-[95%] h-4 rounded-md" />
      </div>
    </div>
  );
};

export const ProfileDetailsLoader = () => {
  return (
    <div className="sticky top-0 flex flex-col justify-center items-center gap-5 bg-white rounded-xl border border-mid-grey p-3 animate-pulse">
      <SkeletonLoader className="w-[143px] h-[143px] rounded-full mt-3" />

      <div className="text-center space-y-2">
        <SkeletonLoader className="w-32 h-4 mx-auto rounded-md" />
        <SkeletonLoader className="w-40 h-3 mx-auto rounded-md" />
      </div>

      <div className="grid grid-cols-3 gap-2 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <RelationshipCardLoader key={index} />
        ))}
      </div>

      <div className="space-y-2 text-center p-2 bg-[#F5F5F5] rounded-lg w-full">
        <SkeletonLoader className="w-20 h-3 mx-auto rounded-md" />
        <SkeletonLoader className="w-28 h-4 mx-auto rounded-md" />
      </div>
    </div>
  );
};

export const BeneficiaryHeaderLoader = () => {
  return (
    <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-mid-grey animate-pulse">
      <div className="flex items-center gap-2">
        <SkeletonLoader className="w-6 h-6 rounded-full" />
        <SkeletonLoader className="w-40 h-5 rounded-md" />
      </div>

      <SkeletonLoader className="w-36 h-9 rounded-lg" />
    </div>
  );
};

export const PlanUpgradeCardLoader = () => {
  return (
    <div className="border border-primary/30 bg-[#F4FFF4] rounded-2xl p-4 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="space-y-2 flex-1">
          <SkeletonLoader className="h-4 w-40 rounded-md" />
          <SkeletonLoader className="h-3 w-full rounded-md" />
          <SkeletonLoader className="h-3 w-3/4 rounded-md" />
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <SkeletonLoader className="h-7 w-20 rounded-md" />
          <div className="space-y-1">
            <SkeletonLoader className="h-2.5 w-28 rounded-md" />
            <SkeletonLoader className="h-2.5 w-24 rounded-md" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 mt-4">
        <SkeletonLoader className="h-3 w-28 rounded-md" />
        <SkeletonLoader className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
};
