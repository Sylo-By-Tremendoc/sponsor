import { BiCheck } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/common/DropdownMenu";
import Typography from "../../../components/common/Typography";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SkeletonLoader from "../../../components/common/SkeletonLoader";
import { ageRanges, beneficiaryCountries } from "../../../utils/constant";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "./Testimonials";
import { useBeneficiaryStore } from "@/store/beneficiary-store";
import type { Country } from "@/types/country";
import { FiUser } from "react-icons/fi";

export type PlansPricing = {
  id: string;
  name: string;
  price: number;
  ageRange: string;
  paymentPlan: string;
  features: string[];
};

export const DisplayMarketDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const location = useBeneficiaryStore((state) => state.location);
  const setLocation = useBeneficiaryStore((state) => state.setLocation);

  const selectedLocation = beneficiaryCountries.find((c) => c.id === location);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return <SkeletonLoader className="h-[35px] w-[120px] rounded-full" />;

  return (
    <SelectMarketDropdown
      selectedLocation={selectedLocation}
      setLocation={setLocation}
    >
      <button
        className="
          flex items-center justify-between
          gap-2 h-8
          rounded-lg border border-gray-300
          bg-white hover:bg-gray-50
          px-3 text-sm font-medium text-gray-800
          transition-colors
        "
      >
        <span className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w160/${selectedLocation?.code}.png`}
            alt={selectedLocation?.label}
            className="w-5 h-5 rounded-sm border border-gray-200 shadow-sm"
          />
          <Typography variant={"xSmallText"}>
            {selectedLocation?.label.split(" ")[0]} Market
          </Typography>
        </span>

        <HiChevronDown
          size={14}
          className="text-gray-700 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </button>
    </SelectMarketDropdown>
  );
};

export const SelectMarketDropdown = ({
  children,
  sameWidthAsTrigger,
  selectedLocation,
  setLocation,
}: {
  children: React.ReactNode;
  sameWidthAsTrigger?: boolean;
  selectedLocation?: Country | null;
  setLocation: (location: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filtered list based on query
  const filtered = beneficiaryCountries.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  // Focus the search input when dropdown opens
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  // handle keyboard enter -> pick first filtered
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const first = filtered[0];
      if (first) {
        setQuery("");
        setOpen(false);
        setLocation(first?.id);
      }
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={(v: boolean) => setOpen(v)}>
      <DropdownMenuTrigger asChild className="group">
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        wrapperClassName="rounded-2xl overflow-hidden"
        className="rounded-xl p-0 bg-white shadow-md w-52"
        sameWidthAsTrigger={sameWidthAsTrigger}
        align="end"
      >
        {/* Search input */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 border border-[#E8E8E8] rounded-lg px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search country"
              className="bg-transparent outline-none text-xs w-full placeholder-gray-400"
              aria-label="Search country"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-46 overflow-auto px-2 py-1">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-500">No results</div>
          ) : (
            filtered.map((country) => {
              const isSelected = selectedLocation?.id === country.id;

              return (
                <DropdownMenuItem
                  key={country.id}
                  onClick={() => {
                    setQuery("");
                    setOpen(false);
                    setLocation(country?.id);
                  }}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                    isSelected ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://flagcdn.com/w160/${country.code}.png`}
                      alt={country.label}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <Typography
                      variant={"smallText"}
                      className="text-charcoal-gray"
                    >
                      {country.label} Market
                    </Typography>
                  </div>

                  {isSelected ? (
                    <BiCheck className="text-green-600" size={18} />
                  ) : null}
                </DropdownMenuItem>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TestimonialCard = () => {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };
  return (
    <div className="relative flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between gap-5 items-"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full md:w-60 h-[292px] object-cover rounded-2xl"
          />

          <div className="flex-1 flex flex-col justify-between gap-8 pb-5 md:py-5">
            <div className="relative">
              <span className="absolute -top-4 left-0 text-[4rem] font-black opacity-50">
                “
              </span>
              <Typography
                variant="largeText"
                className="italic text-gray-800 text-start leading-relaxed pt-10"
              >
                {testimonial.quote}
              </Typography>
            </div>

            <div className="space-y-1 relative">
              <Typography variant="smallTextBold">
                {testimonial.name}
              </Typography>

              {/* Navigation Buttons */}
              <div className="absolute inset-y-0 flex justify-end items-center gap-3 w-full px-4">
                <button
                  onClick={handlePrev}
                  className="shadow-md border border-[#D6D6D6] hover:border-primary rounded-full p-2 transition group cursor-pointer"
                >
                  <HiChevronLeft className="w-6 h-6 text-[#D6D6D6] group-hover:text-primary" />
                </button>
                <button
                  onClick={handleNext}
                  className="shadow-md  border border-[#D6D6D6] hover:border-primary rounded-full p-2 transition group cursor-pointer"
                >
                  <HiChevronRight className="w-6 h-6 text-[#D6D6D6] group-hover:text-primary" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const DisplayAgeRangeDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);

  const ageRange = useBeneficiaryStore((state) => state.ageRange);
  const setAgeRange = useBeneficiaryStore((state) => state.setAgeRange);

  const selectedAgeRange = ageRanges.find((r) => r.id === ageRange);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonLoader className="h-[35px] w-[140px] rounded-full" />;
  }

  return (
    <SelectAgeRangeDropdown
      selectedAgeRange={selectedAgeRange}
      setAgeRange={setAgeRange}
    >
      <button
        className="
          flex items-center justify-between
          gap-2 h-8
          rounded-lg border border-gray-300
          bg-white hover:bg-gray-50
          px-3 text-sm font-medium text-gray-800
          transition-colors
        "
      >
        <span className="flex items-center gap-2">
          <FiUser className="text-gray-700 w-4 h-4" />

          <Typography variant="xSmallText">
            {selectedAgeRange?.label ?? "Select Age Range"}
          </Typography>
        </span>

        <HiChevronDown
          size={14}
          className="text-gray-700 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </button>
    </SelectAgeRangeDropdown>
  );
};

export const SelectAgeRangeDropdown = ({
  children,
  sameWidthAsTrigger,
  selectedAgeRange,
  setAgeRange,
}: {
  children: React.ReactNode;
  sameWidthAsTrigger?: boolean;
  selectedAgeRange?: { id: string; label: string } | null;
  setAgeRange: (range: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = ageRanges.filter((r) =>
    r.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  // focus on search when dropdown opens
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const first = filtered[0];
      if (first) {
        setQuery("");
        setOpen(false);
        setAgeRange(first.id);
      }
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={(v) => setOpen(v)}>
      <DropdownMenuTrigger asChild className="group">
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        wrapperClassName="rounded-2xl overflow-hidden"
        className="rounded-xl p-0 bg-white shadow-md w-52"
        sameWidthAsTrigger={sameWidthAsTrigger}
        align="end"
      >
        {/* Search input */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 border border-[#E8E8E8] rounded-lg px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search age range"
              className="bg-transparent outline-none text-xs w-full placeholder-gray-400"
              aria-label="Search age range"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-46 overflow-auto px-2 py-1">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-500">No results</div>
          ) : (
            filtered.map((range) => {
              const isSelected = selectedAgeRange?.id === range.id;

              return (
                <DropdownMenuItem
                  key={range.id}
                  onClick={() => {
                    setQuery("");
                    setOpen(false);
                    setAgeRange(range.id);
                  }}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                    isSelected ? "bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  <Typography
                    variant={"smallText"}
                    className="text-charcoal-gray"
                  >
                    {range.label}
                  </Typography>

                  {isSelected && (
                    <BiCheck className="text-green-600" size={18} />
                  )}
                </DropdownMenuItem>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
