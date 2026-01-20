import heroImg from "../../../../assets/images/contact-us-hero-img.png";
import HeroSection from "@/components/common/HeroSection";

const Hero = () => {
  const subTopics = [
    { name: "Insurance" },
    { name: "Posts" },
    { name: "Uncategorized " },
    { name: "Comprehensive Coverage: Ensuring Your Pets Are Fully Insured" },
  ];
  return (
    <HeroSection
      title={
        <>
          Comprehensive Coverage: <br />
          Ensuring Your Pets Are Fully Insured
        </>
      }
      backgroundImage={heroImg}
      breadcrumbs={subTopics}
    />
  );
};

export default Hero;
