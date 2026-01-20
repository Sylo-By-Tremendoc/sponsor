import Typography from "@/components/common/Typography";
import { motion } from "motion/react";
import heroImg from "../../../assets/images/about-us-hero-img.png";
import { Section } from "../home/components";
import HeroSection from "@/components/common/HeroSection";

const Hero = () => {
  return (
    <div>
      <HeroSection title={<>How it works</>} backgroundImage={heroImg} />

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Section className="flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-10 md:py-16 py-10">
          <h2 className="md:max-w-md text-xl md:text-3xl text-gray-800 leading-relaxed">
            Simple for You. <br />
            Powerful for Them.
          </h2>

          <Typography variant={"largeText"} className="md:max-w-md">
            We’ve made it easy for you to sponsor quality healthcare for someone
            you love — from anywhere in the world. Here’s how Tremendoc works:
          </Typography>
        </Section>
      </motion.section>
    </div>
  );
};

export default Hero;
