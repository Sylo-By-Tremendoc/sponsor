import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import { Button } from "@/components/common/Button";

const Support = () => {
  return (
    <Section className="space-y-5 relative flex flex-col items-center text-center bg-white">
      <span className="absolute top-0 w-[70%] border-t border-[#A1A1A1]"></span>
      <Pill text="SUPPORTS" />
      <div>
        <TitleText className="mb-3">
          Still Not Sure Which Plan Is Right for You?
        </TitleText>
        <Typography variant={"smallText"} className="text-charcoal-gray">
          We’re here to help. Whether you’re caring for one person or a full
          household, we’ll guide you to the best fit.
        </Typography>
      </div>

      <Button>Talk to an Advisor </Button>
    </Section>
  );
};

export default Support;
