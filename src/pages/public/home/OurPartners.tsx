import { motion } from "motion/react";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";
import partnerLogo1 from "../../../assets/images/partner-logo-1.png";
import partnerLogo2 from "../../../assets/images/partner-logo-2.png";
import partnerLogo3 from "../../../assets/images/partner-logo-3.png";
import partnerLogo4 from "../../../assets/images/partner-logo-4.png";
import partnerLogo5 from "../../../assets/images/partner-logo-5.png";
import partnerLogo6 from "../../../assets/images/partner-logo-6.png";

const OurPartners = () => {
  const partners = [
    {
      name: "AXA",
      logo: partnerLogo1,
    },
    {
      name: "Bupa",
      logo: partnerLogo2,
    },
    {
      name: "Sanlam",
      logo: partnerLogo3,
    },
    {
      name: "Liberty Health",
      logo: partnerLogo4,
    },
    {
      name: "Prudential",
      logo: partnerLogo5,
    },
    {
      name: "Old Mutual",
      logo: partnerLogo6,
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
              className="shrink-0 flex items-center justify-center w-40 h-20 transition-all duration-300"
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
