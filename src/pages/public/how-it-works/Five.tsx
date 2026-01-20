import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import fiveImg from "../../../assets/images/about-us-hero-img.png";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Five = () => {
  return (
    <Section className="md:py-10">
      <motion.div
        className="flex flex-col md:flex-row items-start justify-center gap-7 md:max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Image */}
        <motion.img
          src={fiveImg}
          alt="Customer support"
          className="w-full md:w-80 h-64 rounded-2xl object-cover"
          variants={imageVariants}
        />

        {/* Content */}
        <motion.div className="space-y-3" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Pill text="FIVE" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TitleText className="m-0">
              We’re Here Every Step of the Way
            </TitleText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallText">
              Our customer success team is available 24/7 for any questions —
              from onboarding to ongoing support.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallTextSemibold">
              Human support, whenever you need it.
            </Typography>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Five;
