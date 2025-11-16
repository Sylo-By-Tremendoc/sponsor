import { BiCheckCircle } from "react-icons/bi";
import Pill from "../../../components/common/Pill";
import { Button } from "../../../components/common/Button";
import Typography from "../../../components/common/Typography";
import { motion } from "motion/react";
import { cn } from "../../../utils/class-name";
import { Section, TitleText } from "./components";
import { convertPrice } from "../../../utils/constant";
import type { SectionParam } from ".";

const WhyThisMatters = ({ setShowGetStartedModal }: SectionParam) => {
  const features = [
    {
      title: "Comprehensive Care",
      desc: "Full healthcare coverage including hospitalization, outpatient care, and emergency services.",
    },
    {
      title: "7 Countries Covered",
      desc: "Healthcare coverage available in India, Nigeria, Ghana, Kenya, Pakistan, Bangladesh & Philippines.",
    },
    {
      title: "Trusted Partners",
      desc: "Partnered with leading insurance companies to ensure security for reliable coverage.",
    },
    {
      title: "Family Coverage",
      desc: "Cover multiple family members with flexible plans starting from £9.99/month.",
      highlight: true,
    },
  ];

  const stats = [
    { value: "7%", label: "Countries Covered" },
    { value: "3.5M+", label: "Target Diasporas" },
    { value: "2", label: "Confirmed Partners" },
    { value: convertPrice(9.99), label: "Starting Price" },
  ];

  return (
    <div>
      {/* WHY THIS MATTERS */}
      <Section className="grid md:grid-cols-2 gap-10 bg-[#F9F9FB]">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Pill text="WHY THIS MATTERS" />
          <TitleText>
            When life takes you abroad, their health back home shouldn’t be a
            gamble.
          </TitleText>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => setShowGetStartedModal(true)}>
              Get Started from {convertPrice(9.99)}/month
            </Button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE (Features Grid) */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-4"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={cn(
                "group rounded-2xl p-5 border shadow-sm transition-all duration-300 ease-out",
                item.highlight
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 hover:bg-primary hover:border-primary hover:text-white"
              )}
            >
              {/* Icon Circle */}
              <motion.div
                layout
                className={cn(
                  "p-3 rounded-full w-fit transition-colors duration-300",
                  item.highlight
                    ? "bg-black"
                    : "bg-primary text-white group-hover:bg-black"
                )}
              >
                <BiCheckCircle
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    item.highlight
                      ? "text-primary"
                      : "text-black group-hover:text-primary"
                  )}
                />
              </motion.div>

              {/* Text */}
              <Typography className="mb-2 mt-3 font-semibold text-lg transition-colors duration-300">
                {item.title}
              </Typography>
              <Typography
                variant="xSmallText"
                className={cn(
                  "text-charcoal-gray leading-relaxed group-hover:text-white transition-colors duration-300",
                  item?.highlight && "text-white"
                )}
              >
                {item.desc}
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* STATS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-white py-14"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="cursor-default"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-900"
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default WhyThisMatters;
