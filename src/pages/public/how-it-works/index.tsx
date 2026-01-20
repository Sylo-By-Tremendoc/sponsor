import Navbar from "@/components/navbar";
import GetStartedModal from "../home/GetStartedModal";
import Footer from "@/components/footer";
import StickyTableOfContents from "@/utils/sticky-table-of-content";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Hero from "./Hero";
import GetStarted from "./GetStarted";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";

const HowItWorks = () => {
  const navigate = useNavigate();

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "one", label: "Choose a Care Plan" },
    { id: "two", label: "Add Your Loved One’s Details" },
    { id: "three", label: "We Activate Their Access" },
    { id: "four", label: "You Stay Informed — Always" },
    { id: "five", label: "We’re Here Every Step of the Way" },
    { id: "get-started", label: "Get Started" },
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
          <One />
        </section>
        <section id="about-sylo">
          <Two />
        </section>
        <section id="about-sylo">
          <Three />
        </section>
        <section id="about-sylo">
          <Four />
        </section>
        <section id="about-sylo">
          <Five />
        </section>
        <section id="get-started">
          <GetStarted setShowGetStartedModal={setShowGetStartedModal} />
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

export default HowItWorks;
