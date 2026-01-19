import { Button } from "@/components/common/Button";
import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";
import { useCurrencyStore } from "@/store/currency-store";
import type { PlansParam } from "@/types/plans";
import {
  convertPrice,
  convertToTitleCase,
  displayAgeRange,
} from "@/utils/constant";
import { useState } from "react";
import ViewAllPlanDetailsModal from "./ViewAllPlanDetailsModal";

export const PackagePlanCard = ({
  plan,
  onClick,
}: {
  plan: PlansParam;
  onClick: (val: string) => void;
}) => {
  const price = Number(plan.price);

  const currency = useCurrencyStore((state) => state?.currency);

  const MAX_VISIBLE = 3;

  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  return (
    <div className="flex flex-col justify- bg-white transition-all duration-300 rounded-2xl p-6 border border-[#E5E5E5] shadow-[0_1px_4px_rgba(0,0,0,0.05)] space-y-5 w-full max-w-sm hover:-translate-y-1 hover:border-[#2BAC0B] hover:shadow-[0_4px_12px_rgba(43,172,11,0.1)] cursor-pointer">
      <div>
        <Typography variant="xSmallTextSemibold" className="mb-1 text-gray-900">
          {plan?.name}
        </Typography>
        <Typography variant="xxSmallTextSemibold" className="text-gray-600">
          Age:{" "}
          <span className="font-normal text-charcoal-gray">
            {displayAgeRange(plan.age_range_min, plan.age_range_max)}
          </span>
        </Typography>
      </div>

      <div className="flex items-baseline gap-1">
        <Typography variant="xxlargeTextBold" className="text-[#2BAC0B]">
          {convertPrice(price, currency)}
        </Typography>
        <Typography variant="smallText" className="text-gray-500">
          / {convertToTitleCase(plan?.billing_interval)}
        </Typography>
      </div>

      <Button
        className="w-full bg-[#2BAC0B] hover:bg-[#249009] text-white"
        onClick={() => onClick(plan?.id)}
      >
        Buy Package
      </Button>

      <div className="space-y-3 pt-3 border-t border-gray-100">
        {plan?.benefits?.slice(0, MAX_VISIBLE)?.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <Icons iconName="check" className="w-4 h-4 text-[#2BAC0B]" />
            <Typography variant="xSmallText" className="text-charcoal-gray">
              {benefit?.benefit_name}
            </Typography>
          </div>
        ))}

        {plan?.benefits && plan.benefits.length > MAX_VISIBLE && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDetailsModal(true);
            }}
            className="text-primary text-xs font-medium hover:underline pl-1 pt-2"
          >
            View more
          </button>
        )}
      </div>

      <ViewAllPlanDetailsModal
        plan={plan}
        openViewAllPlanDetailsModal={openDetailsModal}
        setOpenViewAllPlanDetailsModal={setOpenDetailsModal}
        onBuy={() => onClick(plan?.id)}
      />
    </div>
  );
};

export const PackagePlanCardLoader = () => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-[0_1px_4px_rgba(0,0,0,0.05)] space-y-5 w-full max-w-sm">
      {/* Header */}
      <div className="space-y-2">
        <SkeletonLoader className="h-3 w-24" />
        <SkeletonLoader className="h-3 w-32" />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <SkeletonLoader className="h-6 w-20" />
        <SkeletonLoader className="h-3 w-10" />
      </div>

      {/* Button */}
      <SkeletonLoader className="h-10 w-full rounded-lg" />

      {/* Features */}
      <div className="space-y-3 pt-3 border-t border-gray-100">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <SkeletonLoader className="w-4 h-4 rounded-full" />
            <SkeletonLoader className="h-3 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const NoPackagePlan = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full p-8">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687 1.688m-4.243 4.242l1.415-1.414m-7.071 7.07l4.242-4.242m1.414 4.243L8.66 9.316m0 0l1.414-1.415m-1.414 1.415a2.5 2.5 0 11-3.536-3.536 2.5 2.5 0 013.536 3.536z"
          />
        </svg>
      </div>

      <p className="font-semibold text-gray-800 text-sm">No Plans Available</p>
      <p className="text-gray-500 text-xs mt-1">
        There are currently no planplans to show. Please check back later.
      </p>
    </div>
  );
};
