import Icons from "@/components/common/Icons";
import { Section, TitleText } from "../home/components";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import oneImg from "../../../assets/images/about-us-hero-img.png";
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

const One = () => {
  const steps = [
    { name: "Have they had a check-up this month?" },
    { name: "Would you know if an emergency strikes?" },
    { name: "Are your contributions reaching the right hands?" },
  ];

  return (
    <Section className="md:py-10">
      <motion.div
        className="flex flex-col md:flex-row items-stretch justify-center gap-7 md:max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Image */}
        <motion.img
          src={oneImg}
          alt="Choose a care plan"
          className="w-full md:w-80 rounded-2xl object-cover"
          variants={imageVariants}
        />

        {/* Content */}
        <motion.div className="space-y-3" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Pill text="ONE" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TitleText className="m-0">Choose a Care Plan</TitleText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="smallText">
              Pick a healthcare plan that suits your loved one’s needs — from
              general access to full wellness packages.
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
              You stay in control. They get uninterrupted access.
            </Typography>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default One;
