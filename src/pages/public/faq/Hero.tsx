import heroImg from "../../../assets/images/about-us-hero-img.png";
import { Section } from "../home/components";
import Overview from "./Overview";
import HeroSection from "@/components/common/HeroSection";

const Hero = () => {
  return (
    <div>
      <HeroSection
        title={
          <>
            Quick Answers. <br />
            Lasting Solutions.
          </>
        }
        backgroundImage={heroImg}
      />

      <Section className="md:pb-10">
        <Overview />
      </Section>
    </div>
  );
};

export default Hero;
