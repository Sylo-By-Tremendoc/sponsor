import * as React from "react";
import { format, formatDate } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import type { DayPicker, DayPickerProps } from "react-day-picker";
import { cn } from "@/utils/class-name";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Calendar } from "./Calendar";

type Props = {
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  error?: string;
  hint?: React.ReactNode;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabledDays?: DayPickerProps["disabled"];

  wrapperClassName?: string;
  className?: string;

  ref?: React.LegacyRef<HTMLButtonElement>;
} & Omit<
  React.ComponentPropsWithoutRef<typeof DayPicker>,
  "disabled" | "mode" | "selected" | "onSelect"
>;

export const DateInput = ({
  id,
  label,
  required,
  placeholder = "Pick a date",
  error,
  hint,
  disabled,
  defaultValue,
  value,
  onValueChange,
  disabledDays,
  ref,
  wrapperClassName,
  className,
  ...rest
}: Props) => {
  const _id = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [_value, handleValueChange] = useUncontrolled({
    defaultValue,
    value,
    onChange: onValueChange,
  });

  return (
    <div
      className={cn(
        "w-full flex flex-col items-start space-y-1",
        wrapperClassName
      )}
    >
      {label && (
        <label className="text-sm font-medium text-black" htmlFor={id || _id}>
          <FieldLabelText label={label} required={required} />
        </label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild ref={ref}>
          <button
            id={id || _id}
            disabled={disabled}
            className={cn(
              "flex items-center h-10 w-full rounded-[15px] bg-[#F9F9F9] border border-[#EFEFEF] hover:border-primary focus-visible:border-primary px-3 file:border-0 file:bg-transparent file:font-medium placeholder:text-[12px] text-[13px] placeholder:leading-[18px] placeholder:text-[#B5B5B5] focus-visible:outline-none outline-none  disabled:cursor-not-allowed disabled:bg-lightGrey disabled:border-midGrey disabled:text-darkGrey disabled:placeholder:text-darkGrey transition-all duration-300 ease-in-out",
              {
                "hover:border-primary": !error && !disabled,
                "text-charcoal-grey": !_value,
                "border-danger border-2 text-danger ": !!error,
              },
              className
            )}
          >
            <BiCalendar className="mr-2 h-4 w-4" />
            {_value ? (
              format(_value, "PPP")
            ) : (
              <span className=" text-left text-[12px] text-[#B5B5B5]">{placeholder}</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={_value ? new Date(_value) : undefined}
            defaultMonth={_value ? new Date(_value) : undefined}
            onSelect={(date) => {
              handleValueChange(formatDate(date, "yyyy-MM-dd"));
              setIsOpen(false);
            }}
            autoFocus
            showOutsideDays
            required
            disabled={disabledDays}
            {...rest}
          />
        </PopoverContent>
      </Popover>

      {error && <FieldErrorText error={error} />}
      {hint && !error && <FieldHelperText hint={hint} />}

      <input
        type="hidden"
        value={_value ? formatDate(_value, "yyyy-MM-dd") : ""}
      />
    </div>
  );
};

DateInput.displayName = "DateInput";
