import { motion } from "motion/react";
import partnersVideo from "../../../assets/images/partners-video.mp4";
import { Button } from "../../../components/common/Button";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";
import Typography from "../../../components/common/Typography";
import { convertPrice } from "../../../utils/constant";
import { PartnerCard, PartnerCardLoader, PartnerEmptyState } from "./components/PartnerCard";
import { useCurrencyStore } from "@/store/currency-store";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "@/components/common/Swiper";
import useGetSystemMedia from "@/pages/private/dashboard/hooks/use-get-system-media";
import { useSetPagination } from "@/hooks/use-set-pagination";

const TrustedPartners = ({
  showVideo = true,
  setShowGetStartedModal,
}: {
  showVideo?: boolean;
  setShowGetStartedModal: (val: boolean) => void;
}) => {
  const currency = useCurrencyStore((state) => state?.currency);

  const pagination = useSetPagination();

  const filters = {
    type: "banner",
  };

  const { data, isLoading, isFetching } = useGetSystemMedia({
    enabled: true,
    page: pagination?.page,
    per_page: pagination?.per_page,
    filters,
  });

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
          {isLoading || isFetching ? (
            <div className="grid md:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <PartnerCardLoader key={index} />
              ))}
            </div>
          ) : (data?.data?.length || 0) > 0 ? (
            <CustomSwiper
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
              }}
            >
              {data?.data.map((partner, index) => (
                <SwiperSlide key={index}>
                  <PartnerCard partner={partner} />
                </SwiperSlide>
              ))}
            </CustomSwiper>
          ) : <PartnerEmptyState />}
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
