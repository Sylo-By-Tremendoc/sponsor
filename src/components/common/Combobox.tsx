import { BiCheck, BiChevronDown } from "react-icons/bi";
import { TbLoader } from "react-icons/tb";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { sortOptions } from "@/utils/sort-options";
import type { PopoverContentProps } from "@radix-ui/react-popover";
import { useId, useMemo } from "react";
import { cn } from "@/utils/class-name";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandLoading } from "./Commands";
import { Button } from "./Button";

type ComboboxOption<T extends Record<string, unknown>> = {
  label: string;
  value: string;
} & T;

type ComboboxProps<T extends Record<string, unknown>> = {
  defaultValue?: string;
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  label?: React.ReactNode;
  id?: string;
  hint?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;

  searchPlaceholder?: string;
  sort?: boolean;

  options: ComboboxOption<T>[];
  isLoading?: boolean;
  loadingText?: string;
  emptyText?: string;

  triggerClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  align?: PopoverContentProps["align"];

  filterByOnlyValue?: boolean;
  clearSelectionText?: string;
  enableClearSelection?: boolean;

  // Custom rendering
  renderItem?: (option: ComboboxOption<T>, isSelected: boolean) => React.ReactNode;

  ref?: React.LegacyRef<HTMLButtonElement>;
} & React.ComponentPropsWithoutRef<typeof Popover>;

const Combobox = <T extends Record<string, unknown>>({
  id,
  label,
  hint,
  defaultValue,
  value,
  error,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled,
  options,
  onValueChange,
  required,
  sort = true,
  emptyText = "No options found.",
  isLoading = false,
  loadingText = "Loading...",
  triggerClassName,
  wrapperClassName,
  contentClassName,
  align,
  filterByOnlyValue,
  clearSelectionText = "Clear Selection",
  enableClearSelection = true,
  open,
  onOpenChange,
  defaultOpen,
  renderItem,
  ref,
  ...rest
}: ComboboxProps<T>) => {
  const _id = useId();

  const [_open, handleOpenChange] = useUncontrolled({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [_value, handleValueChange] = useUncontrolled({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const sortedOptions = useMemo(() => {
    if (!sort) return options;

    return sortOptions(options);
  }, [options, sort]);

  return (
    <div className={cn("w-full flex flex-col space-y-1.5", wrapperClassName)}>
      {label && (
        <label className="text-sm font-medium text-offBlack" htmlFor={id || _id}>
          <FieldLabelText label={label} required={required} />
        </label>
      )}

      <Popover open={_open} onOpenChange={handleOpenChange} modal {...rest}>
        <PopoverTrigger role="combobox" asChild ref={ref}>
          <button
            id={id || _id}
            disabled={disabled}
            className={cn(
              "flex items-center justify-between h-10 w-full rounded-full border border-mid-grey bg-background px-4 py-2 text-body-xs ring-offset-transaprent focus-visible:outline-none outline-none  disabled:cursor-not-allowed disabled:bg-light-grey disabled:border-mid-grey disabled:text-dark-grey disabled:placeholder:text-dark-grey text-black [&[data-state=open]>svg]:rotate-180",
              {
                " hover:ring-2 ring-offset-0 ring-primary focus-visible:ring-2":
                  !error && !disabled,
                " border-danger border-2 text-danger ": !!error,
                "text-charcoal-grey": !_value,
              },
              triggerClassName
            )}
          >
            <span className=" line-clamp-1">
              {!!_value && isLoading && (
                <span className=" inline-flex items-center gap-1 text-charcoal-grey/80">
                  <TbLoader className=" w-4 h-auto animate-spin mr-1 " />{" "}
                  <i className=" text-body-xs">Loading...</i>
                </span>
              )}
              {!!_value && !isLoading && options.find((option) => option.value === _value)?.label}
              {!_value && placeholder}
            </span>
            <BiChevronDown className=" size-5 opacity-50 shrink-0 transition-transform duration-200" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          sameWidthAsTrigger
         //  wrapperClassName={cn(
         //    " p-[1px] bg-mid-grey shadow-[0px_12px_16px_-4px_rgba(16,_24,_40,_0.08),_0px_4px_6px_-2px_rgba(16,_24,_40,_0.03)] ",
         //    contentClassName
         //  )}
          className="max-h-60 p-0 overflow-hidden"
          onWheel={(e) => {
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          <Command
            {...(filterByOnlyValue
              ? {
                  filter: (value, search) => {
                    if (value.includes(search)) return 1;
                    return 0;
                  },
                }
              : {})}
            className=" max-h-80"
          >
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList className=" flex-1 overflow-y-auto ">
              {!isLoading && <CommandEmpty>{emptyText}</CommandEmpty>}
              {isLoading && (
                <CommandLoading>
                  <p>{loadingText}</p>
                </CommandLoading>
              )}
              <CommandGroup className=" ">
                {sortedOptions.map((option) => {
                  const isSelected = option.value === _value;
                  return (
                    <CommandItem
                      key={option.value + option.label}
                      value={option.value}
                      keywords={[option.label]}
                      onSelect={(currentValue) => {
                        const newValue = isSelected ? "" : currentValue;
                        handleValueChange(newValue);
                        handleOpenChange(false);
                      }}
                    >
                      {renderItem ? (
                        renderItem(option, isSelected)
                      ) : (
                        <>
                          {option.label}
                          <BiCheck
                            className={cn(
                              "ml-auto text-primary",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            {!!_value && enableClearSelection && (
              <div className="bg-light-grey px-4 py-2.5 border-t border-mid-grey">
                <Button
                  onClick={() => {
                    handleValueChange("");
                  }}
                  className=" flex w-full h-[30px] text-body-xs font-bold"
                >
                  {clearSelectionText}
                </Button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {error && <FieldErrorText error={error} />}
      {hint && !error && <FieldHelperText hint={hint} />}
    </div>
  );
};

Combobox.displayName = "Combobox";

export default Combobox;
