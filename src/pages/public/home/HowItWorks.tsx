import { BiCheckCircle } from "react-icons/bi";
import Typography from "../../../components/common/Typography";
import Pill from "../../../components/common/Pill";
import { motion } from "motion/react";
import { Section, TitleText } from "./components";
import { convertPrice } from "../../../utils/constant";
import type { SectionParam } from ".";
import { useCurrencyStore } from "@/store/currency-store";

const HowItWorks = ({ setShowGetStartedModal }: SectionParam) => {
  const currency = useCurrencyStore((state) => state?.currency);

  const steps = [
    {
      title: "Choose Your Plan",
      desc: `Select from affordable healthcare plans starting at ${convertPrice(
        9.99,
        currency
      )}/month, designed specifically for your family’s needs.`,
    },
    {
      title: "Add Family Members",
      desc: "Easily add your loved ones to the plan and provide them detailed comprehensive coverage verification.",
    },
    {
      title: "Activate Coverage",
      desc: "Your family gets immediate access to quality healthcare through insured insurance partners.",
    },
  ];

  return (
    <Section className="space-y-6 bg-[#F9F9FB] text-center">
      <Pill text="HOW IT WORKS" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <TitleText className="mb-3">
          Three Simple Steps to Protect Your Loved Ones
        </TitleText>
        <Typography variant="smallText" className="text-charcoal-gray">
          Getting healthcare coverage for your family back home has never been
          easier
        </Typography>
      </motion.div>

      {/* Steps Section */}
      <div className="grid md:grid-cols-3 gap-8 text-left md:text-center pt-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary rounded-full">
                <BiCheckCircle className="text-black w-6 h-6" />
              </div>
            </div>
            <Typography className="mb-2 text-lg font-semibold text-gray-900">
              {step.title}
            </Typography>
            <Typography variant="xSmallText" className="text-charcoal-gray">
              {step.desc}
            </Typography>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-12 bg-primary text-black font-semibold px-8 py-4 rounded-full text-sm shadow hover:shadow-lg transition-all duration-300"
        onClick={() => setShowGetStartedModal(true)}
      >
        Get Started From {convertPrice(9.99, currency)}/month
      </motion.button>
    </Section>
  );
};

export default HowItWorks;
