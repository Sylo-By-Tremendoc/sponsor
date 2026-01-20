import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import twoImg from "../../../assets/images/about-us-hero-img.png";
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

const Two = () => {
  return (
    <Section className="md:py-10">
      <motion.div
        className="flex flex-col md:flex-row items-start justify-center gap-7 md:max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Text Content */}
        <motion.div className="space-y-3" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Pill text="TWO" />
          </motion.div>

          <motion.div variants={itemVariants}>
          <TitleText className="m-0">
              Add Your Loved One’s Details
            </TitleText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallText">
              Enter your dependent’s name, contact information, and location.
              We’ll set up their account and send them everything they need to
              start.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallTextSemibold">
              No app downloads. No complicated setup.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.img
          src={twoImg}
          alt="Add loved one's details"
          className="w-full md:w-80 h-64 rounded-2xl object-cover"
          variants={imageVariants}
        />
      </motion.div>
    </Section>
  );
};

export default Two;
