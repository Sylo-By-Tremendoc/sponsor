import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StickyTableOfContents from "@/utils/sticky-table-of-content";
import Hero from "./Hero";
import OurPartners from "../home/OurPartners";
import TrustedPartners from "../home/TrustedPartners";
import { useState } from "react";
import GetStartedModal from "../home/GetStartedModal";
import { useNavigate } from "react-router-dom";
import AboutSylo from "./AboutSylo";

const AboutUs = () => {
  const navigate = useNavigate();

  const sections = [
    { id: "hero", label: "Main Section" },
    { id: "about-sylo", label: "How It Works" },
    { id: "trusted-partners", label: "Trusted Partners" },
    { id: "our-partners", label: "Our Partners" },
  ];

  const [showGetStartedModal, setShowGetStartedModal] = useState(false);

  return (
    <div className="flex flex-col justify-between">
      <Navbar className="absolute top-0 left-0 right-0" />

      <div>
        <section id="hero">
          <Hero />
        </section>
        <section id="about-sylo">
          <AboutSylo />
        </section>
        <section id="trusted-partners">
          <TrustedPartners
            setShowGetStartedModal={setShowGetStartedModal}
            showVideo={false}
          />
        </section>
        <section id="our-partners">
          <OurPartners />
        </section>

        <GetStartedModal
          showGetStartedModal={showGetStartedModal}
          setShowGetStartedModal={setShowGetStartedModal}
          handleContinue={() => navigate("/pricing")}
        />
      </div>

      <Footer />

      <StickyTableOfContents sections={sections} topOffset={72} />
    </div>
  );
};

export default AboutUs;
