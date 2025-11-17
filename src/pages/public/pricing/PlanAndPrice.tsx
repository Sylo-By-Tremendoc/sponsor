import { cn } from "@/utils/class-name";
import Pill from "../../../components/common/Pill";
import Typography from "../../../components/common/Typography";
import { Section, TitleText } from "../home/components";

const PlanAndPrice = ({className}: {className?: string}) => {
  return (
    <Section className={cn("space-y-10 py-10!", className)}>
      <div className="flex flex-col items-center md:items-start space-y-3">
        <Pill text="PLANS AND PRICING" />
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-3 md:gap-8 300 w-full">
          <div className="text-center md:text-left">
            <TitleText className="mb-0">
              Affordable Care. <br /> Real Peace of Mind.
            </TitleText>
          </div>

          <Typography
            variant="smallText"
            className="text-charcoal-gray md:max-w-lg text-center md:text-left leading-relaxed"
          >
            No more guesswork—just four simple tiers, each loaded with the
            services your loved ones deserve and transparent costs that fit your
            budget. Choose the plan that best matches your family size and watch
            your peace of mind grow.
          </Typography>
        </div>
      </div>

      <div className="border-t border-[#A1A1A1]"></div>
    </Section>
  );
};

export default PlanAndPrice;
