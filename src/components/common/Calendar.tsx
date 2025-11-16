"use client";

import { cn } from "@/utils/class-name";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DropdownInput from "./DropdownInput";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  disableLessThan18?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disableFutureDates = false,
  disablePastDates = false,
  disableLessThan18 = false,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(new Date());
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const eighteenYearsAgoYear = currentYear - 18;

  // Generate years with restrictions
  const earliestYear = currentYear - 150; // 150 years ago from the current year
  const latestYear = currentYear + 20;

  const years = Array.from(
    { length: latestYear - earliestYear + 1 },
    (_, index) => {
      const year = latestYear - index;
      if (disableFutureDates && year > currentYear) return null;
      if (disablePastDates && year < currentYear) return null;
      if (disableLessThan18 && year > eighteenYearsAgoYear) return null;
      return { label: year.toString(), value: year.toString() };
    }
  ).filter((year): year is { label: string; value: string } => year !== null);

  // Generate months
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthYear = month.getFullYear();

    if (
      (disableFutureDates &&
        monthYear === currentYear &&
        index > currentMonth) ||
      (disablePastDates && monthYear === currentYear && index < currentMonth)
    ) {
      return null;
    }

    if (disableLessThan18 && monthYear === eighteenYearsAgoYear) {
      const eighteenYearsAgoMonth = new Date().getMonth();
      if (index > eighteenYearsAgoMonth) {
        return null;
      }
    }

    return {
      label: new Date(0, index).toLocaleString("default", { month: "long" }),
      value: index.toString(),
    };
  }).filter(
    (month): month is { label: string; value: string } => month !== null
  );

  const handleMonthChange = (value: string) => {
    if (value) {
      const newMonth = parseInt(value, 10);
      const updatedMonth = new Date(month.setMonth(newMonth));
      setMonth(new Date(updatedMonth));
    }
  };

  const handleYearChange = (value: string) => {
    if (value) {
      const newYear = parseInt(value, 10);
      const updatedYear = new Date(month.setFullYear(newYear));
      setMonth(new Date(updatedYear));
    }
  };

  const currentMonthOption = months.find(
    (m) => parseInt(m.value, 10) === month.getMonth()
  );
  const currentYearOption = years.find(
    (y) => parseInt(y.value, 10) === month.getFullYear()
  );

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2 px-3 mt-3 ">
        <DropdownInput
          value={currentMonthOption?.value}
          onValueChange={handleMonthChange}
          options={months}
          placeholder="Month..."
          sort={false}
        />
        <DropdownInput
          value={currentYearOption?.value}
          onValueChange={handleYearChange}
          options={years}
          placeholder="Year..."
          sort={false}
        />
      </div>
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "",
          caption: "hidden",
          caption_label: "hidden",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent rounded-md border border-midGrey p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute right-[3.2rem]",
          nav_button_next: "absolute right-4",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-offBlack font-semibold rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-midGrey/50 [&:has([aria-selected])]:bg-midGrey first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            // buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-lightGrey rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "text-white rounded-md hover:text-white focus:text-white",
          day_today: "bg-gradient-to-b from-primary to-secondary text-white",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-midGrey/50 aria-selected:text-offBlack aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-midGrey aria-selected:text-offBlack",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: () => <BiChevronLeft className="ml-1 w-4 h-4" />,
          IconRight: () => <BiChevronRight className="ml-1 w-4 h-4" />,
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
