import { Button } from "@/components/common/Button";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";

export const SubscriptionSummaryCard = ({
  total,
  onActionClick,
  title = "Subscription Plans",
  subtitle = "Your Active Subscription Package",
  actionText = "Buy New Plan",
}: {
  total: number;
  onActionClick: () => void;
  title?: string;
  subtitle?: string;
  actionText?: string;
}) => {
  return (
    <div className="flex flex-col justify-between gap-5 p-4 bg-white border border-mid-grey rounded-2xl min-h-[187px]">
      <div className="space-y-1">
        <Typography variant="mediumTextSemibold">{title}</Typography>

        <Typography variant="xSmallText" className="text-charcoal-gray">
          {subtitle}
        </Typography>
      </div>

      <div className="flex justify-between items-end gap-5">
        <Typography className="text-[4rem] font-bold leading-none">
          {total}
        </Typography>

        <Button onClick={onActionClick}>{actionText}</Button>
      </div>
    </div>
  );
};

export const SubscriptionSummaryCardLoader = () => {
  return (
    <div className="flex flex-col justify-between gap-5 p-4 bg-white border border-mid-grey rounded-2xl min-h-[187px] animate-pulse">
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-40 rounded" />
        <SkeletonLoader className="h-3 w-56 rounded" />
      </div>

      <div className="flex justify-between items-end gap-5">
        <SkeletonLoader className="h-16 w-20 rounded-lg" />
        <SkeletonLoader className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
};
