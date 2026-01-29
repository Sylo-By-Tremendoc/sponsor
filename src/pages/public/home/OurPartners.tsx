import { motion } from "motion/react";
import Pill from "../../../components/common/Pill";
import { Section, TitleText } from "./components";
import useGetSystemMedia from "@/pages/private/dashboard/hooks/use-get-system-media";
import { useSetPagination } from "@/hooks/use-set-pagination";

const OurPartners = () => {
  const pagination = useSetPagination();

  const filters = {
    type: "logo",
  };

  const { data, isLoading, isFetching } = useGetSystemMedia({
    enabled: true,
    page: pagination?.page,
    per_page: pagination?.per_page,
    filters,
  });

  const partners = data?.data ?? [];
  const isBusy = isLoading || isFetching;

  return (
    <Section className="space-y-4 text-center bg-white relative">
      <Pill text="OUR PARTNERS" />
      <TitleText className="pb-3">
        Trusted by Health Professionals & Partners
      </TitleText>

      {isBusy && (
        <div className="flex justify-center gap-16 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-40 h-20 flex items-center justify-center">
              <div className="h-6 w-28 rounded-md bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {!isBusy && partners.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-500">
            No partner logos available at the moment.
          </p>
        </div>
      )}

      {!isBusy && partners.length > 0 && (
        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex gap-16 min-w-full"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center w-40 h-20"
              >
                <img
                  src={partner?.media?.url}
                  alt={partner?.title ?? "Partner logo"}
                  className="h-10 object-contain transition"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </Section>
  );
};

export default OurPartners;
