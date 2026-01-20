import { motion } from "motion/react";
import partnersVideo from "../../../assets/images/partners-video.mp4";
import { Button } from "../../../components/common/Button";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";
import Typography from "../../../components/common/Typography";
import { convertPrice } from "../../../utils/constant";
import { PartnerCard } from "./components/PartnerCard";
import { useCurrencyStore } from "@/store/currency-store";
import img1 from "../../../assets/images/partners/axa-mansard.png";
import img2 from "../../../assets/images/partners/glico.png";
import img3 from "../../../assets/images/partners/lead-way-1.jpeg";
import img4 from "../../../assets/images/partners/lead-way-2.png";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "@/components/common/Swiper";

const TrustedPartners = ({
  showVideo = true,
  setShowGetStartedModal,
}: {
  showVideo?: boolean;
  setShowGetStartedModal: (val: boolean) => void;
}) => {
  const currency = useCurrencyStore((state) => state?.currency);

  const partners = [
    {
      name: "AXA Mansard",
      description:
        "Nigeria’s leading health insurer with over 2 million active members, providing reliable and innovative healthcare solutions.",
      logo: img1,
    },
    {
      name: "Leadway Assurance",
      description:
        "Over 50 years of trusted healthcare coverage in Nigeria, protecting 1.5 million+ members with comprehensive plans.",
      logo: img3,
    },
    {
      name: "GLICO Health",
      description:
        "Ghana’s premier private health insurer offering quality healthcare access to thousands of members nationwide.",
      logo: img2,
    },
    {
      name: "Leadway Assurance",
      description:
        "Over 50 years of trusted healthcare coverage in Nigeria, protecting 1.5 million+ members with comprehensive plans.",
      logo: img4,
    },
    // {
    //   name: "STAR Health",
    //   description:
    //     "India’s largest standalone health insurer delivering reliable care nationwide with a focus on comprehensive coverage.",
    //   logo: heroImg3,
    // },
  ];

  return (
    <Section className="md:pb-10 w-full flex flex-col items-center justify-center bg-white space-y-16">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#f9f9fb] rounded-3xl px-5 p-8">
        <div className="space-y-4">
          <Pill text="TRUSTED PARTNERS" />
          <TitleText className="mb-3">Working with Leading Insurers</TitleText>
          <Typography
            variant={"smallText"}
            className="text-charcoal-gray max-w-xs"
          >
            We partner with established, regulated insurance companies to ensure
            reliable coverage.
          </Typography>
        </div>

        <div className="md:col-span-3">
          <CustomSwiper
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
            }}
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <PartnerCard
                  logo={partner.logo}
                  name={partner.name}
                  description={partner.description}
                />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </div>
      </div>

      {showVideo && (
        <motion.div
          className="w-full max-w-6xl rounded-3xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <video
            src={partnersVideo}
            width={1200}
            height={600}
            className="object-cover w-full h-[400px]"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      )}

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={() => setShowGetStartedModal(true)}>
          Get Started From {convertPrice(9.99, currency)}/month
        </Button>
      </motion.button>
    </Section>
  );
};

export default TrustedPartners;
