import { useState } from "react";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import StickyTableOfContents from "../../../utils/sticky-table-of-content";
import Blogs from "./Blogs";
import GetStarted from "./GetStarted";
import GetStartedModal from "./GetStartedModal";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Location from "./Location";
import OurPartners from "./OurPartners";
import TrustedPartners from "./TrustedPartners";
import WhyThisMatters from "./WhyThisMatters";

export type SectionParam = {
  setShowGetStartedModal: (val: boolean) => void;
}

const HomePage = () => {
  const sections = [
    { id: "hero", label: "Main Section" },
    { id: "why-this-matters", label: "Why This Matters" },
    { id: "how-it-works", label: "How It Works" },
    { id: "trusted-partners", label: "Trusted Partners" },
    { id: "get-started", label: "Get Started" },
    { id: "our-partners", label: "Our Partners" },
    { id: "location", label: "Where We Operate" },
    { id: "blogs", label: "Blogs" },
  ];

  const [showGetStartedModal, setShowGetStartedModal] = useState(false);

  return (
    <div className="flex flex-col justify-between">
      <Navbar />

      <div>
        <section id="hero">
          <Hero setShowGetStartedModal={setShowGetStartedModal} />
        </section>
        <section id="why-this-matters">
          <WhyThisMatters setShowGetStartedModal={setShowGetStartedModal} />
        </section>
        <section id="how-it-works">
          <HowItWorks setShowGetStartedModal={setShowGetStartedModal} />
        </section>
        <section id="trusted-partners">
          <TrustedPartners setShowGetStartedModal={setShowGetStartedModal} />
        </section>
        <section id="get-started">
          <GetStarted setShowGetStartedModal={setShowGetStartedModal} />
        </section>
        <section id="our-partners">
          <OurPartners />
        </section>
        <section id="location">
          <Location setShowGetStartedModal={setShowGetStartedModal} />
        </section>
        <section id="blogs">
          <Blogs />
        </section>

        <GetStartedModal
          showGetStartedModal={showGetStartedModal}
          setShowGetStartedModal={setShowGetStartedModal}
        />
      </div>

      <Footer />

      <StickyTableOfContents sections={sections} topOffset={72} />
    </div>
  );
};

export default HomePage;
