import * as React from "react";
import RPNInputRHF, {
  type Country,
} from "react-phone-number-input/react-hook-form";
import {
  type FlagProps,
  getCountryCallingCode,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Commands";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import SkeletonLoader from "./SkeletonLoader";
import clsx from "clsx";
import { cn } from "../../utils/class-name";
import type { UseControllerProps } from "react-hook-form";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import type { JSX } from "react/jsx-runtime";
import Typography from "./Typography";

type PhoneInputProps<T extends Record<string, unknown>> = Omit<
  React.ComponentProps<typeof RPNInputRHF>,
  "control"
> & {
  label?: string;
  hint?: string;
  error?: string;
  info?: string;
  wrapperClassName?: string;
  showErrorText?: boolean;
  isLoadingFelid?: boolean;
  required?: boolean;
  rightIcon?: React.ReactNode;
  allowedCountries?: Country[];
  defaultCountry?: Country;
} & UseControllerProps<T>;

const PhoneInput = <T extends Record<string, unknown>>({
  className,
  label,
  hint,
  error,
  info,
  showErrorText = true,
  required,
  isLoadingFelid,
  wrapperClassName,
  numberInputProps,
  rightIcon,
  allowedCountries,
  defaultCountry,
  ...props
}: PhoneInputProps<T>) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start w-full space-y-1",
        wrapperClassName
      )}
    >
      <label className=" flex flex-col space-y-1 w-full ">
        {label && (
          <div className="label-container">
            <FieldLabelText label={label} required={required} />
          </div>
        )}

        {isLoadingFelid ? (
          <SkeletonLoader className="w-28 h-[1.2rem] mt-1 rounded" />
        ) : (
          <div className="relative">
            <RPNInputRHF
              className={cn("flex", className)}
              numberInputProps={{ error, ...numberInputProps }}
              flagComponent={FlagComponent}
              countrySelectComponent={(
                selectProps: JSX.IntrinsicAttributes & CountrySelectProps
              ) => (
                <CountrySelect
                  {...selectProps}
                  allowedCountries={allowedCountries}
                />
              )}
              inputComponent={InputComponent}
              smartCaret={false}
              international
              defaultCountry={defaultCountry || "NG"}
              {...props}
            />

            {rightIcon && (
              <span
                className={clsx(
                  " absolute top-1/2 -translate-y-1/2 shrink-0 right-4",
                  {
                    " text-offBlack": !error && !props.disabled,
                    " opacity-50": props.disabled,
                    " text-danger": error,
                  }
                )}
                role="icon"
              >
                {rightIcon}
              </span>
            )}
          </div>
        )}
      </label>
      {error && <FieldErrorText error={error} className="text-start" />}
      {hint && !error && <FieldHelperText hint={hint} />}
    </div>
  );
};

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: string }
>(({ className, error, ...props }, ref) => (
  <input
    className={cn(
      "flex w-full rounded-[15px] bg-[#F9F9F9] border border-[#EFEFEF] hover:border-primary focus-visible:border-primary px-3 file:border-0 file:bg-transparent file:font-medium placeholder:text-[12px] text-[13px] placeholder:leading-[18px] placeholder:text-[#4B4B4B] focus-visible:outline-none outline-none  disabled:cursor-not-allowed disabled:bg-lightGrey disabled:border-midGrey disabled:text-darkGrey disabled:placeholder:text-darkGrey transition-all duration-300 ease-in-out",
      "rounded-l-none",
      {
        "": !error,
        " border-danger border-2 text-danger ": !!error,
      },
      className
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  options: CountryEntry[];
  allowedCountries?: Country[];
  onChange: (country: Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  allowedCountries,
  onChange,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);

  // filter list if allowedCountries is provided
  const filteredCountryList = allowedCountries
    ? countryList.filter((c) => allowedCountries.includes(c.value!))
    : countryList;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger role="combobox" asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex items-center h-10 rounded-l-full border border-mid-grey bg-[#F9F9F9] px-3 py-2 text-body-xs ring-offset-transparent focus-visible:outline-none outline-none  disabled:cursor-not-allowed disabled:bg-light-grey disabled:border-mid-grey disabled:text-dark-grey disabled:placeholder:text-dark-grey text-black [&[data-state=open]>svg]:rotate-180"
          )}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />

          <BiChevronDown
            className={cn(
              " -mr-2 size-5 opacity-50 shrink-0 transition-transform duration-200"
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 border-mid-grey overflow-hidden"
        align="start"
      >
        <div
          className={
            " p-px bg-white w-72 max-w-full max-h-60 overflow-y-auto " +
            " shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] "
          }
        >
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends FlagProps {
  selectedCountry: Country;
  onChange: (country: Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem
      className={cn(
        "items-center gap-2 hover:bg-lightGrey cursor-pointer",
        country === selectedCountry && "bg-green-50  !hover:bg-green-50"
      )}
      onSelect={() => onChange(country)}
    >
      <FlagComponent
        country={country}
        countryName={countryName}
        className="mt-1"
      />
      <Typography variant={"xSmallText"} className="flex-1">
        {countryName}
      </Typography>
      <Typography
        variant={"xSmallText"}
        className="text-foreground/50"
      >{`+${getCountryCallingCode(country)}`}</Typography>

      {country === selectedCountry && (
        <BiCheck
          className={cn(
            "ml-auto text-primary",
            country === selectedCountry ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </CommandItem>
  );
};

const FlagComponent = ({
  country,
  countryName,
  className,
}: FlagProps & { className?: string }) => {
  const Flag = flags[country];

  return (
    <span
      className={cn(
        "flex h-4 w-6 overflow-hidden rounded-sm bg-mid-grey/50 [&_svg]:size-full",
        className
      )}
    >
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export default PhoneInput;
