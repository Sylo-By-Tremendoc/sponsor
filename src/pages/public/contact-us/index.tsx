import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import StickyTableOfContents from "../../../utils/sticky-table-of-content";
import Contact from "./Contact";
import Hero from "./Hero";
import MapLocation from "./MapLocation";
import SendAMessage from "./SendAMessage";

const ContactUs = () => {
  const sections = [
    { id: "hero", label: "Main Section" },
    { id: "contact-us", label: "Contact Us" },
    { id: "send-a-message", label: "Send Us A Message" },
    { id: "map-location", label: "Map Location" },
  ];

  return (
    <div className="flex flex-col justify-between">
      <Navbar className="absolute top-0 left-0 right-0" />

      <div>
        <section id="hero">
          <Hero />
        </section>
        <section id="contact-us">
          <Contact />
        </section>
        <section id="send-a-message">
          <SendAMessage />
        </section>
        <section id="map-location">
          <MapLocation />
        </section>
      </div>

      <Footer />

      <StickyTableOfContents sections={sections} topOffset={72} />
    </div>
  );
};

export default ContactUs;
