import { BiCheck } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../common/DropdownMenu";
import { useEffect, useRef, useState } from "react";
import { CURRENCIES } from "@/utils/constant";

export type CurrencyDropdownParams = {
  id: string;
  label: string;
  symbol: string;
  flag: string;
};

export const CurrencyDropdown = ({
  children,
  sameWidthAsTrigger,
  selectedCurrency,
  changeCurrency,
}: {
  children: React.ReactNode;
  sameWidthAsTrigger?: boolean;
  selectedCurrency?: CurrencyDropdownParams;
  changeCurrency?: (currency: CurrencyDropdownParams) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = CURRENCIES.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const first = filtered[0];
      if (first) {
        changeCurrency?.(first);
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
              placeholder="Search Currency"
              className="bg-transparent outline-none text-xs w-full placeholder-gray-400"
              aria-label="Search Currency"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-46 overflow-auto">
          {filtered?.map((currency) => {
            const isSelected = currency.id === selectedCurrency?.id;
            return (
              <DropdownMenuItem
                key={currency.id}
                onClick={() => {
                  changeCurrency?.(currency);
                  setOpen(false);
                  setQuery("");
                }}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  isSelected ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={currency.flag}
                    alt={currency.label}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className="space-x-1">
                    <span className="text-xs font-bold text-charcoal-gray">
                      {currency.id}
                    </span>
                    <span className="text-[11px] text-charcoal-gray">
                      {currency.label}
                    </span>
                  </p>
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

export default CurrencyDropdown;
