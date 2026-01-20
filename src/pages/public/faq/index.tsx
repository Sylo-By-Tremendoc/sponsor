import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StickyTableOfContents from "@/utils/sticky-table-of-content";
import Hero from "./Hero";
import GeneralQuestions from "./GeneralQuestions";
import ExploreVideo from "./ExploreVideo";

const FAQ = () => {
  const sections = [
    { id: "hero", label: "Hero" },
    { id: "general-questions", label: "General Questions" },
    { id: "explore-video", label: "Explore Video" },
  ];
  return (
    <div className="flex flex-col justify-between">
      <Navbar className="absolute top-0 left-0 right-0" />

      <div>
        <section id="hero">
          <Hero />
        </section>
        <section id="general-questions">
          <GeneralQuestions />
        </section>
        <section id="explore-video">
          <ExploreVideo />
        </section>
      </div>

      <Footer />

      <StickyTableOfContents sections={sections} topOffset={72} />
    </div>
  );
};

export default FAQ;
