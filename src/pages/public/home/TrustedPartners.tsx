import { motion } from "motion/react";
import partnersVideo from "../../../assets/images/partners-video.mp4";
import { Button } from "../../../components/common/Button";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";
import Typography from "../../../components/common/Typography";
import { convertPrice } from "../../../utils/constant";
import type { SectionParam } from ".";
import { PartnerCard } from "./components/PartnerCard";
import { useCurrencyStore } from "@/store/currency-store";

const TrustedPartners = ({ setShowGetStartedModal }: SectionParam) => {

    const currency = useCurrencyStore((state) => state?.currency);


  const partners = [
    {
      name: "AXA Mansard",
      description: "Nigeria Leading health insurer with 2M+ members",
    },
    {
      name: "Leadway Assurance",
      description: "Nigeria 50+ years experience, 1.5M+ members",
    },
    {
      name: "STAR Health",
      description: "India's largest standalone health insurer",
    },
  ];

  return (
    <Section className="w-full flex flex-col items-center justify-center bg-white space-y-16">
      {/* Trusted Partners */}
      <motion.div
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#f9f9fb] rounded-3xl px-5 p-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Left Text */}
        <div className="space-y-4">
          <Pill text="TRUSTED PARTNERS" />
          <TitleText className="mb-3">Working with Leading Insurers</TitleText>
          <Typography
            variant={"smallText"}
            className="text-charcoal-gray max-w-xs"
          >
            We partner with established, regulated insurance companies to ensure
            reliable coverage.
          </Typography>
        </div>

        {/* Partner Cards */}
        {partners.map((partner, index) => (
          <PartnerCard
            key={index}
            name={partner.name}
            description={partner.description}
            index={index}
          />
        ))}
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-full max-w-6xl rounded-3xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <video
          src={partnersVideo}
          width={1200}
          height={600}
          className="object-cover w-full h-[400px]"
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={() => setShowGetStartedModal(true)}>
          Get Started From {convertPrice(9.99, currency)}/month
        </Button>
      </motion.button>
    </Section>
  );
};

export default TrustedPartners;
