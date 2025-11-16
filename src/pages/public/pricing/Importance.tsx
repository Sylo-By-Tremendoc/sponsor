import Typography from "../../../components/common/Typography";
import Pill from "../../../components/common/Pill";
import { motion } from "motion/react";
import { Section, TitleText } from "../home/components";
import Icons from "../../../components/common/Icons";

const Importance = () => {
  const steps = [
    {
      icon: <Icons iconName="heart" />,
      title: "True Peace of Mind",
      desc: `No more “Did they really get care?” — your Sponsor Dashboard logs every visit, test & prescription.`,
    },
    {
      icon: <Icons iconName="users" />,
      title: "Nationwide Reach",
      desc: "1,000+ hospitals, clinics, labs & pharmacies—urban and rural.",
    },
    {
      icon: <Icons iconName="shield" />,
      title: "24/7 Dedicated Support",
      desc: "Our team guides you and your loved ones at any hour.",
    },
  ];

  return (
    <Section className="space-y-4 bg-white text-center">
      <Pill text="IMPORTANCE OF THESE PLANS" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <TitleText className="mb-3">Why These Plans Shine</TitleText>
      </motion.div>

      {/* Steps Section */}
      <div className="grid md:grid-cols-3 gap-8 text-left md:text-center pt-5">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#F9F9FB]  rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary rounded-full">{step?.icon}</div>
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
    </Section>
  );
};

export default Importance;
