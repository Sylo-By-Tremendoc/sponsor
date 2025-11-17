import Typography from "@/components/common/Typography";
import { useState } from "react";
import { DisplayAgeRangeDropdown, DisplayMarketDropdown, PricePlanCard } from "./components";
import { cn } from "@/utils/class-name";
import { Section } from "../home/components";

const DifferentMarketPricing = ({
  onClick,
  className,
}: {
  onClick: (val: string) => void;
  className?: string;
}) => {
  const PLANS = [
    {
      id: "basic",
      name: "Beta Life Basic",
      price: 9.99,
      ageRange: "0-64 years",
      paymentPlan: "monthly",
      features: [
        "Surgical Services",
        "Medical Consultations",
        "Laboratory Tests",
        "Emergency Care",
      ],
    },
    {
      id: "standard",
      name: "Beta Life Standard",
      price: 19.99,
      ageRange: "0-64 years",
      paymentPlan: "monthly",
      features: [
        "Everything in Basic",
        "Dental & Vision Coverage",
        "Specialist Visits",
        "24/7 Telemedicine Access",
      ],
    },
    {
      id: "premium",
      name: "Beta Life Premium",
      price: 29.99,
      ageRange: "0-70 years",
      paymentPlan: "monthly",
      features: [
        "Everything in Standard",
        "Maternity Care",
        "Private Room",
        "International Coverage",
      ],
    },
    {
      id: "elite",
      name: "Beta Life Elite",
      price: 49.99,
      ageRange: "0-75 years",
      paymentPlan: "monthly",
      features: [
        "Everything in Premium",
        "Personal Health Concierge",
        "VIP Hospital Access",
        "Annual Wellness Retreat",
      ],
    },
  ];

  const [paymentPlan, setPaymentPlan] = useState("MONTHLY");
  const paymentOptions = ["MONTHLY", "QUARTERLY", "ANNUALLY"];
  return (
    <Section className={cn("space-y-4 pt-0!", className)}>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <PricePlanCard
            key={plan.id}
            plan={plan}
            paymentPlan={paymentPlan}
            onClick={onClick}
          />
        ))}
      </div>
    </Section>
  );
};

export default DifferentMarketPricing;
