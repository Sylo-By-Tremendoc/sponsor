import Icons from "@/components/common/Icons";
import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import fourImg from "../../../assets/images/about-us-hero-img.png";
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

const Four = () => {
  const steps = [
    { name: "Appointment history" },
    { name: "Consultation summaries" },
    { name: "Notifications for usage and upcoming renewals" },
  ];

  return (
    <Section className="md:py-10">
      <motion.div
        className="flex flex-col md:flex-row items-start justify-center gap-7 md:max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Content */}
        <motion.div className="space-y-3" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Pill text="FOUR" />
          </motion.div>

          <motion.div variants={itemVariants}>
             <TitleText className="m-0">
              You Stay Informed — Always
            </TitleText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallText">
              Your sponsor dashboard keeps you updated with:
            </Typography>
          </motion.div>

          {/* Checklist */}
          <motion.div className="space-y-3 py-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                variants={itemVariants}
              >
                <Icons
                  iconName="check"
                  className="w-4 h-4 text-[#2BAC0B]"
                />
                <Typography
                  variant="xSmallText"
                  className="text-charcoal-gray"
                >
                  {step.name}
                </Typography>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallTextSemibold">
              You’re never in the dark about their care.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.img
          src={fourImg}
          alt="Stay informed dashboard"
          className="w-full md:w-80 h-64 rounded-2xl object-cover"
          variants={imageVariants}
        />
      </motion.div>
    </Section>
  );
};

export default Four;
