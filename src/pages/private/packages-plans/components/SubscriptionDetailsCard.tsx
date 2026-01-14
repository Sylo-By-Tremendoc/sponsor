import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { useCurrencyStore } from "@/store/currency-store";
import type { PlansParam } from "@/types/plans";
import { convertPrice } from "@/utils/constant";
import { Link } from "react-router-dom";

export const SubscriptionDetailsCard = ({
  plan,
  onUpgrade,
}: {
  plan: PlansParam;
  onUpgrade?: () => void;
}) => {
  const currency = useCurrencyStore((state) => state?.currency);

  console.log("Plan", plan)

  return (
    <div className="border border-primary bg-[#F4FFF4] rounded-2xl p-4">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div>
          <Typography variant="mediumText">
            {plan.name || "Plan"}
          </Typography>

          <Typography variant="smallText" className="text-charcoal-gray pt-1">
            Billed {plan.billing_interval}
          </Typography>
        </div>

        {/* Price */}
        <div className="shrink-0 flex gap-2">
          <Typography variant="heading3">
            {convertPrice(Number(plan.price), currency)}
          </Typography>

          <Typography variant="xxSmallText" className="text-charcoal-gray">
            Perfect for sponsoring <br /> one special person
          </Typography>
        </div>
      </div>

      {/* Actions */}

      <div className="flex justify-between items-center gap-5 mt-3">
        <Link to="#" className="text-xs text-primary underline">
          View all benefits
        </Link>

        {onUpgrade && (
          <Button className="text-xs" onClick={onUpgrade}>
            Upgrade Plan
          </Button>
        )}
      </div>
    </div>
  );
};
