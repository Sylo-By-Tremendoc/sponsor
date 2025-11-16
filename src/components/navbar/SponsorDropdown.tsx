import { BiCheck } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../common/DropdownMenu";
import { useEffect, useRef, useState } from "react";
import { sponsorCountries } from "@/utils/constant";

export type SponsorDropdownParams = {
  id: string;
  label: string;
  symbol: string;
  flag: string;
};

export const SponsorDropdown = ({
  children,
  sameWidthAsTrigger,
  selectedSponsor,
  changeSponsor,
}: {
  children: React.ReactNode;
  sameWidthAsTrigger?: boolean;
  selectedSponsor?: SponsorDropdownParams;
  changeSponsor?: (sponsor: SponsorDropdownParams) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = sponsorCountries.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const first = filtered[0];
      if (first) {
        changeSponsor?.(first);
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

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
              placeholder="Search Sponsor"
              className="bg-transparent outline-none text-xs w-full placeholder-gray-400"
              aria-label="Search Sponsor"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-46 overflow-auto">
          {filtered?.map((sponsor) => {
            const isSelected = sponsor.id === selectedSponsor?.id;
            return (
              <DropdownMenuItem
                key={sponsor.id}
                onClick={() => {
                  changeSponsor?.(sponsor);
                  setOpen(false);
                  setQuery("");
                }}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  isSelected ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={sponsor.flag}
                    alt={sponsor.label}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium text-charcoal-gray">
                    {sponsor.label}
                  </span>
                </div>

                {isSelected ? (
                  <BiCheck className="text-green-600" size={18} />
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SponsorDropdown;

export const CURRENCIES = [
  {
    id: "NGN",
    flag: "https://flagcdn.com/w160/ng.png",
    symbol: "₦",
    label: "NGN",
    name: "Nigerian Naira",
  },
  {
    id: "GHS",
    flag: "https://flagcdn.com/w160/gh.png",
    symbol: "₵",
    label: "GHS",
    name: "Ghanaian Cedi",
  },
  {
    id: "KES",
    flag: "https://flagcdn.com/w160/ke.png",
    symbol: "KSh",
    label: "KES",
    name: "Kenyan Shilling",
  },
  {
    id: "CAD",
    flag: "https://flagcdn.com/w160/ca.png",
    symbol: "C$",
    label: "CAD",
    name: "Canadian Dollar",
  },
  {
    id: "USD",
    flag: "https://flagcdn.com/w160/us.png",
    symbol: "$",
    label: "USD",
    name: "United States Dollar",
  },
  {
    id: "GBP",
    flag: "https://flagcdn.com/w160/gb.png",
    symbol: "£",
    label: "GBP",
    name: "British Pound Sterling",
  },
  {
    id: "INR",
    flag: "https://flagcdn.com/w160/in.png",
    symbol: "₹",
    label: "INR",
    name: "Indian Rupee",
  },
];
