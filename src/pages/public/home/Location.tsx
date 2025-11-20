import { motion } from "motion/react";
import worldImg from "../../../assets/images/world-map-dots.png";
import Pill from "@/components/common/Pill";
import { Section, TitleText } from "./components";
import { Button } from "@/components/common/Button";
import { convertPrice } from "@/utils/constant";
import Typography from "@/components/common/Typography";
import type { SectionParam } from ".";

const Location = ({ setShowGetStartedModal }: SectionParam) => {
  return (
    <Section className="space-y-5 relative flex flex-col items-center text-center bg-white">
      <span className="absolute top-0 w-[70%] border-t border-[#A1A1A1]"></span>
      <Pill text="WHERE WE OPERATE" />
      <TitleText className="mb-8">
        Sponsoring care from the UK, USA & Canada to your loved ones in every
        corner of India, Ghana, Kenya and Nigeria.
      </TitleText>

      <motion.div
        className="relative w-full max-w-4xl h-[400px] select-none"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
        }}
      >
        <motion.img
          src={worldImg}
          alt="World Map"
          className="w-full opacity-70 absolute top-0 left-0"
          animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          style={{ pointerEvents: "none" }}
        />

        {/* Markers positioned according to common map projection (approximate) */}
        <CountryMarker
          flag="https://flagcdn.com/w160/ca.png"
          label="Canada"
          style={{ top: "18%", left: "16%" }} // northern North America
        />
        <CountryMarker
          flag="https://flagcdn.com/w160/us.png"
          label="USA"
          style={{ top: "36%", left: "20%" }} // central US
        />
        <CountryMarker
          flag="https://flagcdn.com/w160/gb.png"
          label="UK"
          style={{ top: "10%", left: "52%" }} // United Kingdom / Western Europe
        />
        <CountryMarker
          flag="https://flagcdn.com/w160/gh.png"
          label="Ghana"
          style={{ top: "47%", left: "42%" }} // West Africa
          glow
        />
        <CountryMarker
          flag="https://flagcdn.com/w160/ng.png"
          label="Nigeria"
          style={{ top: "48%", left: "49%" }} // Nigeria (slightly right of Ghana)
          glow
        />
        <CountryMarker
          flag="https://flagcdn.com/w160/ke.png"
          label="Kenya"
          style={{ top: "52%", left: "56%" }} // East Africa
          glow
        />
        {/* <CountryMarker
          flag="https://flagcdn.com/w160/in.png"
          label="India"
          style={{ top: "42%", left: "78%" }} // India / South Asia
          glow
        /> */}
      </motion.div>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={() => setShowGetStartedModal(true)}>
          Get Started From {convertPrice(9.99)}/month
        </Button>
      </motion.button>
    </Section>
  );
};

export default Location;

const markerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const floatAnimation = {
  y: [0, -6, 0],
  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
};

const CountryMarker = ({ flag, label, style, glow = false }: any) => (
  <motion.div
    className="absolute flex flex-col items-center"
    style={style}
    variants={markerVariants}
    animate={floatAnimation}
    whileHover={{ scale: 1.15 }}
  >
    <div
      className={`relative flex items-center justify-center rounded-full w-11 h-11 bg-white shadow-lg border border-gray-100 ${
        glow
          ? "before:content-[''] before:absolute before:w-16 before:h-16 before:rounded-full before:bg-primary before:blur-xl before:animate-pulse"
          : ""
      }`}
    >
      <img
        src={flag}
        alt={label}
        className="w-8 h-8 rounded-full object-cover z-10 border-2 border-white"
      />
    </div>
    <Typography
      variant={"xxSmallText"}
      className="mt-2 t font- text-gray-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow"
    >
      {label}
    </Typography>
  </motion.div>
);
