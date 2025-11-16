import { motion } from "motion/react";
import partnersImg from "../../../assets/images/partners.png";
import { Button } from "../../../components/common/Button";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";
import Typography from "../../../components/common/Typography";
import { convertPrice } from "../../../utils/constant";
import type { SectionParam } from ".";

const TrustedPartners = ({ setShowGetStartedModal }: SectionParam) => {
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
          <motion.div
            key={index}
            className="bg-white hover:bg-[#0000001A] rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 relative"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
          >
            <h3 className="font-semibold text-gray-900 text-base mb-3">
              {partner.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {partner.description}
            </p>
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-400/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-full max-w-6xl rounded-3xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={partnersImg}
          alt="Consultation"
          width={1200}
          height={600}
          className="object-cover w-full h-[400px]"
        />
      </motion.div>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={() => setShowGetStartedModal(true)}>
          Get Started From {convertPrice(9.99)}/month
        </Button>
      </motion.button>
    </Section>
  );
};

export default TrustedPartners;
