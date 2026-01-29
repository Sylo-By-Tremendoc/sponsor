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
        "relative h-[22rem] md:h-[80vh] rounded-b-[2rem] overflow-hidden text-white",
        className,
      )}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Content */}
      <div
        className="
          relative z-[2] h-full
          flex flex-col justify-end items-start
          md:flex-row md:justify-between md:items-end
          px-6 md:px-16
          pb-8 md:pb-12
        "
      >
        <Wrapper
          {...(animate && {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: "easeOut" },
            viewport: { once: true },
          })}
        >
          <Typography
            as="h1"
            variant="heading1Semibold"
            className="
              leading-tight
              mb-4 md:mb-8
              text-2xl md:text-5xl
              bg-gradient-to-r from-white via-white/90 to-primary
              bg-clip-text text-transparent
            "
          >
            {title}
          </Typography>

          {breadcrumbs.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
              {breadcrumbs.map((item, index) => (
                <div key={item.name} className="flex items-center gap-1">
                  <span>{item.name}</span>
                  {index < breadcrumbs.length - 1 && (
                    <HiChevronRight className="text-gray-400 text-xs" />
                  )}
                </div>
              ))}
            </div>
          )}
        </Wrapper>
      </div>
    </section>
  );
};

export default HeroSection;
