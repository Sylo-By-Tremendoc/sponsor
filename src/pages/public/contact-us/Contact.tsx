import Pill from "../../../components/common/Pill";
import Typography from "../../../components/common/Typography";
import { Section, TitleText } from "../home/components";

const Contact = () => {
  return (
    <Section className="space-y-10 md:py-15">
      <div className="flex flex-col items-center md:items-start space-y-3">
        <Pill text="CONTACT US" />
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-3 md:gap-8 300 w-full">
          <div className="text-center md:text-left">
            <TitleText className="mb-0">How can we help you today?</TitleText>
          </div>

          <Typography
            variant="smallText"
            className="text-charcoal-gray md:max-w-lg text-center md:text-left leading-relaxed"
          >
            We’re ready to partner with you to propel your business forward.
            Let’s discover how our expertise can drive transformative success.
          </Typography>
        </div>
      </div>

      <div className="border-t border-[#A1A1A1]"></div>
    </Section>
  );
};

export default Contact;
