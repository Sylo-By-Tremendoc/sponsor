import Typography from "@/components/common/Typography";
import { useMemo, useState } from "react";
import { DisplayAgeRangeDropdown, DisplayMarketDropdown } from "./components";
import { cn } from "@/utils/class-name";
import { Section } from "../home/components";
import { useSetPagination } from "@/hooks/use-set-pagination";
import NetworkError from "@/pages/error/NetworkError";
import {
  NoPackagePlan,
  PackagePlanCard,
  PackagePlanCardLoader,
} from "./components/PackagePlanCard";
import useGetAllPlans from "@/pages/private/packages-plans/plans/hooks/use-get-all-plans";
import { useBeneficiaryStore } from "@/store/beneficiary-store";
import { splitAgeBracket } from "@/utils/constant";

const DifferentMarketPricing = ({
  onClick,
  className,
}: {
  onClick: (val: string) => void;
  className?: string;
}) => {
  const pagination = useSetPagination();

  const ageRange = useBeneficiaryStore((state) => state.ageRange);
  const location = useBeneficiaryStore((state) => state.location);

  const { minAge, maxAge } = splitAgeBracket(ageRange);

  const { data, isLoading, isFetching, refetch, error } = useGetAllPlans({
    enabled: !!ageRange && !!location,
    page: pagination?.page,
    per_page: pagination?.per_page,
    filters: {
      age_range_min: minAge,
      age_range_max: maxAge,
      country_code: location,
    },
  });

  const [paymentPlan, setPaymentPlan] = useState("MONTHLY");
  const paymentOptions = ["MONTHLY", "YEARLY"];

  const filteredPlans = useMemo(() => {
    if (!data) return [];

    return data?.data?.filter(
      (plan) =>
        plan.billing_interval?.toLowerCase() === paymentPlan.toLowerCase()
    );
  }, [data, paymentPlan]);

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Section className={cn("space-y-4 !pt-0", className)}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex items-center p-1 bg-[#F6F5FA] rounded-lg">
          {paymentOptions.map((option) => (
            <Typography
              key={option}
              variant="smallText"
              className={cn(
                "py-2 px-3 rounded-lg cursor-pointer transition-colors duration-200",
                paymentPlan === option ? "bg-white shadow-sm" : "text-gray-600"
              )}
              onClick={() => setPaymentPlan(option)}
            >
              {option.charAt(0) + option.slice(1).toLowerCase()}
            </Typography>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <DisplayAgeRangeDropdown />
          <DisplayMarketDropdown />
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <PackagePlanCardLoader key={index} />
          ))}
        </div>
      ) : filteredPlans.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPlans.map((plan) => (
            <PackagePlanCard
              key={plan.id}
              plan={plan}
              paymentPlan={paymentPlan}
              onClick={onClick}
            />
          ))}
        </div>
      ) : (
        <NoPackagePlan />
      )}
    </Section>
  );
};

export default DifferentMarketPricing;
