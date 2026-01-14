import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Section } from "./components";
import { beneficiaryCountries, convertPrice } from "../../../utils/constant";
import type { SectionParam } from ".";
import Typography from "@/components/common/Typography";

// Background images
import heroImg1 from "../../../assets/images/hero-image.png";
import heroImg2 from "../../../assets/images/hero-image-1.png";
import heroImg3 from "../../../assets/images/hero-image-2.png";
import heroImg4 from "../../../assets/images/why-this-matters.png";
import { useCurrencyStore } from "@/store/currency-store";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4];

const Hero = ({ setShowGetStartedModal }: SectionParam) => {
  const [currentBg, setCurrentBg] = useState(0);

  const currency = useCurrencyStore((state) => state?.currency);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section className="relative h-[90vh] rounded-b-[2rem] overflow-hidden text-white">
        {heroImages.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            animate={{
              opacity: index === currentBg ? 1 : 0,
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <div className="relative z-[2] h-full flex flex-col md:flex-row justify-between md:items-end px-6 md:px-16 py-10 pt-16 md:pt-6 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-5 space-x-3 shadow-lg">
              <div className="flex -space-x-2">
                {[
                  "https://randomuser.me/api/portraits/women/1.jpg",
                  "https://randomuser.me/api/portraits/men/2.jpg",
                  "https://randomuser.me/api/portraits/men/3.jpg",
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-primary hover:scale-110 transition-transform duration-300"
                  />
                ))}
              </div>

              <div>
                <p className="text-2xl text-white font-semibold">12K+</p>
                <p className="text-gray-300 text-xs">
                  • Active users worldwide
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative md:w-1/2"
          >
            <Typography
              as="h1"
              variant="heading1Semibold"
              className="leading-tight mb-8 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent"
            >
              Send Healthcare <br />
              Home, Just Like you <br />
              Send Money.
            </Typography>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-[#00cc00] text-black font-medium px-6 py-3 rounded-full text-sm transition"
                onClick={() => setShowGetStartedModal(true)}
              >
                Start From {convertPrice(9.99, currency)}/month
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-400 hover:border-primary hover:text-primary px-6 py-3 rounded-full text-sm transition"
                onClick={() => setShowGetStartedModal(true)}
              >
                View Health Plans
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FLAG SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Section className="flex flex-col md:flex-row justify-between md:items-center gap-10 md:py-16 py-10">
          <h2 className="md:max-w-md text-xl md:text-2xl text-gray-800 leading-relaxed">
            Diasporas in the <span className="font-semibold">UK, US</span> and{" "}
            <span className="font-semibold">Canada</span> can now provide
            comprehensive healthcare coverage for family back home.
          </h2>

          <div className="flex items-center gap-3">
            {beneficiaryCountries.map((code) => (
              <motion.div
                key={code.id}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 shadow-md transition-all duration-300"
              >
                <img
                  src={`https://flagcdn.com/w160/${code.code}.png`}
                  alt={code.label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.section>
    </div>
  );
};

export default Hero;
