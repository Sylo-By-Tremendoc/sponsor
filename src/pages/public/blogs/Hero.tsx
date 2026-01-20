import heroImg from "../../../assets/images/blog-hero-img.png";
import HeroSection from "@/components/common/HeroSection";

const Hero = () => {
  return (
    <HeroSection
      title={
        <>
          Navigate Our <br />
          News & Blog Post
        </>
      }
      backgroundImage={heroImg}
    />
  );
};

export default Hero;
