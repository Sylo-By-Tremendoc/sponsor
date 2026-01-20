import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import { motion } from "motion/react";
import type { SectionParam } from "../home";
import { useCurrencyStore } from "@/store/currency-store";
import { convertPrice } from "@/utils/constant";

const GetStarted = ({ setShowGetStartedModal }: SectionParam) => {
  const currency = useCurrencyStore((state) => state?.currency);
  return (
    <Section className="md:py-10 text-white">
      <div className="flex flex-col justify-center items-center gap-4 px-5 py-16 bg-[#08382C] rounded-2xl">
        <Pill text="Get Started" />
        <TitleText className="m-0 text-center sm:text-4xl">
          Your Love, Their Health. <br /> One Simple System.
        </TitleText>
        <Typography variant={"smallText"} className="py-3">
          With Tremendoc, it doesn’t.
        </Typography>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-[#00cc00] text-black font-medium px-6 py-3 rounded-full text-sm transition"
            onClick={() => setShowGetStartedModal(true)}
          >
            Start From {convertPrice(9.99, currency)}/month
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-gray-400 hover:border-primary hover:text-primary px-6 py-3 rounded-full text-sm transition"
            onClick={() => setShowGetStartedModal(true)}
          >
            Talk to an Expert
          </motion.button>
        </div>
      </div>
    </Section>
  );
};

export default GetStarted;
