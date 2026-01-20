import heroImg from "../../../assets/images/about-us-hero-img.png";
import HeroSection from "@/components/common/HeroSection";

const Hero = () => {
  return (
    <HeroSection
      title={
        <>
          {" "}
          Revolutionizing Healthcare <br /> at Home and Abroad
        </>
      }
      backgroundImage={heroImg}
    />
  );
};

export default Hero;
