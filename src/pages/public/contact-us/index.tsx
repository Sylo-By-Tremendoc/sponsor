import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import StickyTableOfContents from "../../../utils/sticky-table-of-content";
import Contact from "./Contact";
import MapLocation from "./MapLocation";
import SendAMessage from "./SendAMessage";

const ContactUs = () => {
  const sections = [
    { id: "contact-us", label: "Contact Us" },
    { id: "send-a-message", label: "Send Us A Message" },
    { id: "map-location", label: "Map Location" },
  ];

  return (
    <div className="flex flex-col justify-between">
      <Navbar className="bg-white text-black border-0" />

      <div>
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
