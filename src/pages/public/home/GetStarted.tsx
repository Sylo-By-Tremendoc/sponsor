import type { SectionParam } from ".";
import { Button } from "../../../components/common/Button";
import Pill from "../../../components/common/Pill";
import Typography from "../../../components/common/Typography";
import { convertPrice } from "../../../utils/constant";
import { Section, TitleText } from "./components";

const GetStarted = ({ setShowGetStartedModal }: SectionParam) => {
  return (
    <Section className="space-y-4 bg-[#F9F9FB] text-center">
      <Pill text="GET STARTED" />
      <div>
        <TitleText className="mb-3">Ready to Protect Your Family?</TitleText>
        <Typography variant={"smallText"} className="text-charcoal-gray">
          Join thousands of diasporas who trust SYLO to provide quality
          healthcare for their loved ones back home
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 pt-5">
        <Button onClick={() => setShowGetStartedModal(true)}>
          Start From {convertPrice(9.99)}/month
        </Button>
        <Button
          variant={"outline"}
          onClick={() => setShowGetStartedModal(true)}
        >
          View Health Plans
        </Button>
      </div>
    </Section>
  );
};

export default GetStarted;
