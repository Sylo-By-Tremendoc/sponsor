import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/common/Typography";
import { cn } from "@/utils/class-name";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Welcome to your Dashboard",
    description:
      "Manage beneficiaries, subscriptions, and payments all in one place.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800",
  },
  {
    id: "2",
    title: "Track Your Subscriptions",
    description:
      "Easily view active plans, billing cycles, and upcoming renewals.",
    image:
      "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1800",
  },
  {
    id: "3",
    title: "Secure Payments",
    description:
      "All transactions are protected with industry-standard security.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1800",
  },
];

export const DashboardCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[index].id}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />

          <div className="relative z-10 h-full flex flex-col justify-center px-16 py-8 max-w-xl text-white">
            <Typography variant="largeTextBold" className="mb-3">
              {slides[index].title}
            </Typography>
            <Typography variant="smallText" className="text-gray-200">
              {slides[index].description}
            </Typography>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/90 hover:bg-primary text-white rounded-full p-2 shadow-lg"
      >
        <HiArrowSmLeft size={20} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/90 hover:bg-primary text-white rounded-full p-2 shadow-lg"
      >
        <HiArrowSmRight size={20} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-primary" : "w-2 bg-white/50 hover:bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
};
