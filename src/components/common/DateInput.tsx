"use client";

import * as React from "react";
import { format } from "date-fns";
import { OpenPopoverBtn, Popover, PopoverContent } from "./Popover";
import { cn } from "@/utils/class-name";
import { BiCalendar } from "react-icons/bi";
import SkeletonLoader from "./SkeletonLoader";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import { Calendar } from "./Calendar";

type Props = {
  label?: string;
  required?: boolean;
  isLoadingFelid?: boolean;
  placeholder?: string;
  error?: string;
  hint?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  minDate?: string;
  maxDate?: string;
  /** Prevents selection of dates less than 18 years from the current date */
  disableLessThan18?: boolean;
  onValueChange?: (value: any) => void;
};

export const DateInput = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      label,
      required,
      isLoadingFelid,
      placeholder = "Pick a date",
      error,
      hint,
      disabled,
      defaultValue,
      disableFutureDates = false,
      disablePastDates = false,
      minDate,
      maxDate,
      disableLessThan18 = false,
      className,
      onValueChange,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(
      defaultValue ? new Date(defaultValue) : undefined
    );

    const currentDate = new Date();
    const minSelectableDate = minDate ? new Date(minDate) : null;
    const maxSelectableDate = maxDate ? new Date(maxDate) : null;

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    React.useEffect(() => {
      if (defaultValue) {
        setDate(new Date(defaultValue));
      }
    }, [defaultValue]);

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            className="text-sm font-medium text-offBlack text-start"
            htmlFor={label}
          >
            <FieldLabelText label={label} required={required} />
          </label>
        )}

        {isLoadingFelid ? (
          <SkeletonLoader className="w-28 h-[1.2rem] mt-1 rounded" />
        ) : (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <OpenPopoverBtn asChild ref={ref}>
              <button
                disabled={disabled}
                className={cn(
                  "flex items-center h-10 w-full rounded-[15px] bg-[#F9F9F9] border border-[#EFEFEF] hover:border-primary focus-visible:border-primary px-3 file:border-0 file:bg-transparent file:font-medium placeholder:text-[12px] text-[13px] placeholder:leading-[18px] placeholder:text-[#4B4B4B] focus-visible:outline-none outline-none disabled:cursor-not-allowed disabled:bg-lightGrey disabled:border-midGrey disabled:text-darkGrey disabled:placeholder:text-darkGrey transition-all duration-300 ease-in-out",
                  {
                    "": !error && !disabled,
                    " border-danger border-2 text-danger ": !!error,
                  },
                  className
                )}
              >
                <BiCalendar className="mr-2 w-4 h-4" />
                {date ? (
                  format(date, "MMM do, yyyy")
                ) : (
                  <span className="text-xs font-light text-left text-[#B5B5B5]">{placeholder}</span>
                )}
              </button>
            </OpenPopoverBtn>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  date && onValueChange?.(format(date, "yyyy-MM-dd"));
                  setIsOpen(false);
                }}
                disableFutureDates={disableFutureDates}
                disablePastDates={disablePastDates}
                disableLessThan18={disableLessThan18}
                disabled={(date) => {
                  const isFutureDateDisabled =
                    disableFutureDates && date > currentDate;
                  const isPastDateDisabled =
                    disablePastDates === true &&
                    date < new Date(currentDate.setHours(0, 0, 0, 0));
                  const isBeforeMinDateDisabled = minSelectableDate
                    ? date < minSelectableDate
                    : false;
                  const isAfterMaxDateDisabled = maxSelectableDate
                    ? date > maxSelectableDate
                    : false;
                  const isLessThan18Disabled = disableLessThan18
                    ? date > eighteenYearsAgo
                    : false;

                  return (
                    isFutureDateDisabled ||
                    isPastDateDisabled ||
                    isBeforeMinDateDisabled ||
                    isAfterMaxDateDisabled ||
                    isLessThan18Disabled
                  );
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        {error && <FieldErrorText error={error} className="text-start" />}
        {hint && !error && (
          <FieldHelperText hint={hint} className="text-start" />
        )}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
