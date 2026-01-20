import heroImg from "../../../assets/images/contact-us-hero-img.png";
import HeroSection from "@/components/common/HeroSection";

const Hero = () => {
  return (
    <HeroSection
      title={
        <>
          How can we help <br /> you today?
        </>
      }
      backgroundImage={heroImg}
    />
  );
};

export default Hero;
