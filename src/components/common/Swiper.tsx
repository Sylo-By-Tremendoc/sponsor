import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useId } from "react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const CustomSwiper = ({
  children,
  slidesPerView = 1,
  spaceBetween = 16,
  loop = true,
  autoplay = true,
  autoplayDelay = 3000,
  showNavigation = true,
  breakpoints,
  className = "",
}: {
  children: React.ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  breakpoints?: Record<number, any>;
  className?: string;
}) => {
  const id = useId();
  const prevClass = `swiper-prev-${id}`;
  const nextClass = `swiper-next-${id}`;

  return (
    <div className="relative">
      {showNavigation && (
        <>
          <button
            className={`${prevClass} absolute left-[-14px] top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full bg-white shadow-lg
              flex items-center justify-center
              hover:bg-primary hover:text-white transition`}
          >
            <HiOutlineChevronLeft size={18} />
          </button>

          <button
            className={`${nextClass} absolute right-[-14px] top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full bg-white shadow-lg
              flex items-center justify-center
              hover:bg-primary hover:text-white transition`}
          >
            <HiOutlineChevronRight size={18} />
          </button>
        </>
      )}

      <Swiper
        modules={[
          ...(autoplay ? [Autoplay] : []),
          ...(showNavigation ? [Navigation] : []),
        ]}
        navigation={
          showNavigation
            ? {
                prevEl: `.${prevClass}`,
                nextEl: `.${nextClass}`,
              }
            : false
        }
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        grabCursor
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        breakpoints={breakpoints}
        className={className}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
