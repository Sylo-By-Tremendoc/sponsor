import { motion } from "motion/react";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";

const OurPartners = () => {
  const partners = [
    {
      name: "AXA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Axa_Logo.svg",
    },
    {
      name: "Bupa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Bupa_logo.svg",
    },
    {
      name: "Sanlam",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Sanlam_logo.svg",
    },
    {
      name: "Liberty Health",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/8a/Liberty_Group_logo.svg",
    },
    {
      name: "Prudential",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/85/Prudential_plc_logo.svg",
    },
    {
      name: "Old Mutual",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/16/Old_Mutual_logo.svg",
    },
  ];

  return (
    <Section className="space-y-4 text-center bg-white relative">
      <Pill text="OUR PARTNERS" />
      <TitleText className="pb-3">
        Trusted by Health Professionals & Partners
      </TitleText>

      {/* Animation wrapper */}
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-16 min-w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center w-40 h-20 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default OurPartners;
