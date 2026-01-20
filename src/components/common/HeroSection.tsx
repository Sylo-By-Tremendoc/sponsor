import Typography from "@/components/common/Typography";
import { motion } from "motion/react";
import { HiChevronRight } from "react-icons/hi";
import clsx from "clsx";

interface BreadcrumbItem {
  name: string;
}

const HeroSection = ({
  title,
  backgroundImage,
  breadcrumbs = [],
  overlayOpacity = 0.4,
  animate = true,
  className,
}: {
  title: React.ReactNode;
  backgroundImage: string;
  breadcrumbs?: BreadcrumbItem[];
  overlayOpacity?: number;
  animate?: boolean;
  className?: string;
}) => {
  const Wrapper = animate ? motion.div : "div";

  return (
    <section
      className={clsx(
        "relative h-[80vh] rounded-b-[2rem] overflow-hidden text-white",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />

      <div className="relative z-[2] h-full flex flex-col md:flex-row justify-between md:items-end px-6 md:px-16 py-10 pt-16 md:pt-6 gap-5">
        <Wrapper
          {...(animate && {
            initial: { opacity: 0, x: 80 },
            whileInView: { opacity: 1, x: 0 },
            transition: { duration: 0.8 },
            viewport: { once: true },
          })}
        >
          <Typography
            as="h1"
            variant="heading1Semibold"
            className="leading-tight mb-8 bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent"
          >
            {title}
          </Typography>

          {breadcrumbs.length > 0 && (
            <Typography variant="smallText">
              <div className="flex flex-wrap items-center gap-1 text-gray-300">
                {breadcrumbs.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <span>{item.name}</span>

                    {index < breadcrumbs.length - 1 && (
                      <HiChevronRight className="text-gray-400 text-sm" />
                    )}
                  </div>
                ))}
              </div>
            </Typography>
          )}
        </Wrapper>
      </div>
    </section>
  );
};

export default HeroSection;
