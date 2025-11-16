import React, { useState } from "react";
import clsx from "clsx";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import SkeletonLoader from "./SkeletonLoader";
import { cn } from "../../utils/class-name";

type NumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  error?: string;
  label?: string;
  hint?: string;
  height?: string;
  isLoadingField?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string; // e.g. ₦, $, €
  formatNumber?: boolean; // new prop to control formatting
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      error,
      label,
      hint,
      className,
      height = "40px",
      prefix,
      leftIcon,
      rightIcon,
      isLoadingField,
      formatNumber = !!prefix, // default: format if prefix exists
      onChange,
      ...rest
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>("");

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ) => {
      const raw = e.target.value.replace(/,/g, "");
      // const numericValue = raw === "" ? undefined : Number(raw);
      setDisplayValue(raw); // or format if needed

      if (onChange) onChange(e); // pass the event to RHF
    };

    //  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    const raw = e.target.value.replace(/,/g, ""); // remove commas
    //    const numericValue = raw === "" ? undefined : Number(raw);

    //    if (!isNaN(Number(raw))) {
    //      // Conditionally format for display
    //      const formatted =
    //        formatNumber && raw
    //          ? new Intl.NumberFormat("en-US").format(Number(raw))
    //          : raw;
    //      setDisplayValue(formatted);
    //    }

    //    // Pass raw number to parent
    //    if (onChange) onChange(numericValue, e);
    //  };

    return (
      <div className="space-y-1.5">
        <label className="flex flex-col space-y-1">
          {label && (
            <div className="label-container">
              <FieldLabelText label={label} required={rest.required} />
            </div>
          )}

          {isLoadingField ? (
            <SkeletonLoader className="w-28 h-[1.2rem] mt-1 rounded" />
          ) : (
            <div className="relative flex items-center w-full">
              {!!leftIcon && !prefix && (
                <span
                  className={clsx("absolute left-4", {
                    "text-primary": !error && !rest.disabled,
                    "opacity-50": rest.disabled,
                    "text-danger": error,
                  })}
                >
                  {leftIcon}
                </span>
              )}

              {prefix && (
                <span
                  className={clsx(
                    "absolute left-3 text-sm font-semibold",
                    error ? "text-danger" : "text-gray-700"
                  )}
                >
                  {prefix}
                </span>
              )}

              <input
                ref={ref}
                type="text"
                inputMode="numeric"
                className={cn(
                  "flex w-full rounded-[15px] bg-[#F9F9F9] border border-[#EFEFEF] hover:border-primary focus-visible:border-primary px-3 file:border-0 file:bg-transparent file:font-medium placeholder:text-[12px] text-[13px] placeholder:text-[#B5B5B5] focus-visible:outline-none outline-none disabled:cursor-not-allowed disabled:bg-lightGrey disabled:border-midGrey disabled:text-darkGrey disabled:placeholder:text-darkGrey transition-all duration-300 ease-in-out",
                  {
                    "border-danger border-2 text-danger": !!error,
                    "pl-10": !!leftIcon || !!prefix,
                    "pr-10": !!rightIcon,
                  },
                  className
                )}
                style={{ height }}
                value={displayValue}
                onChange={handleInputChange}
                {...rest}
              />

              {rightIcon && (
                <span
                  className={clsx("absolute right-4", {
                    "text-offBlack": !error && !rest.disabled,
                    "opacity-50": rest.disabled,
                    "text-danger": error,
                  })}
                >
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </label>

        {error && <FieldErrorText error={error} className="text-start" />}
        {hint && !error && (
          <FieldHelperText hint={hint} className="text-start" />
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
export default NumberInput;
