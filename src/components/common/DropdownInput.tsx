"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { TbLoader } from "react-icons/tb";
import { useUncontrolled } from "../../hooks/use-uncontrolled";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import { cn } from "../../utils/class-name";
import { Button } from "./Button";
import Typography from "./Typography";

export type Option<T extends Record<string, unknown> = {}> = {
  label: string;
  value: string;
  description?: string;
} & T;

type DropdownInputProps<T extends Record<string, unknown> = {}> = {
  options: Option<T>[];

  /** Called when a value is selected */
  onValueChange: (value: string, option?: Option<T>) => void;

  // Controlled value
  value?: string;
  defaultValue?: string;

  label?: string;
  id?: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;

  // Options behavior
  sort?: boolean;
  emptyText?: string;

  // Loading state
  isLoading?: boolean;
  loadingText?: string;

  // Customization
  triggerClassName?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  clearSelectionText?: string;
  enableClearSelection?: boolean;
  renderItem?: (option: Option<T>, isSelected: boolean) => React.ReactNode;

  // Ref
  ref?: React.LegacyRef<HTMLButtonElement>;
} & React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

const DropdownInput = <T extends Record<string, unknown> = {}>({
  label,
  id,
  hint,
  defaultValue,
  value,
  error,
  placeholder = "Select...",
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
  clearSelectionText,
  enableClearSelection = true,
  renderItem,
  ref,
  ...rest
}: DropdownInputProps<T>) => {
  const _id = React.useId();

  const [_value, handleValueChange] = useUncontrolled({
    value,
    defaultValue,
    onChange: (newValue: string) => {
      const selectedOption = options.find((opt) => opt.value === newValue);
      onValueChange(newValue, selectedOption);
    },
  });

  const sortedOptions = React.useMemo(() => {
    if (!sort) return options;
    return [...options].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
    );
  }, [options, sort]);

  return (
    <div className={cn("w-full flex flex-col space-y-1.5", wrapperClassName)}>
      {label && (
        <label
          className="text-sm font-medium text-offBlack"
          htmlFor={id || _id}
        >
          <FieldLabelText label={label} required={required} />
        </label>
      )}

      <Select
        value={_value}
        onValueChange={handleValueChange}
        disabled={disabled}
        {...rest}
      >
        <SelectTrigger
          id={id || _id}
          ref={ref}
          error={error}
          disabled={disabled}
          className={triggerClassName}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-1 text-charcoal-grey/80">
              <TbLoader className="w-4 h-auto animate-spin mr-1" />
              <i className="text-body-xs">Loading...</i>
            </span>
          ) : (
            <>
              {sortedOptions.find((option) => option.value === _value) ? (
                <SelectValue>
                  {
                    sortedOptions.find((option) => option.value === _value)
                      ?.label
                  }
                </SelectValue>
              ) : (
                <span className="text-[12px] leading-[18px] text-[#B5B5B5]">
                  {placeholder}
                </span>
              )}
            </>
          )}
        </SelectTrigger>

        <SelectContent
          className={contentClassName}
          value={_value}
          handleValueChange={handleValueChange}
          clearSelectionText={clearSelectionText}
          enableClearSelection={enableClearSelection}
        >
          {isLoading ? (
            <div className="px-4 py-6 text-body-sm">{loadingText}</div>
          ) : sortedOptions.length > 0 ? (
            sortedOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {renderItem ? (
                  renderItem(option, _value === option.value)
                ) : (
                  <div className="flex flex-col items-start space-y-1">
                    <Typography
                      variant="smallText"
                      className={cn(
                        "text-body-sm",
                        !option.description ? "font-normal" : "font-bold"
                      )}
                    >
                      {option.label}
                    </Typography>

                    {option?.description && (
                      <Typography
                        variant="xSmallText"
                        className="text-charcoal-gray"
                      >
                        {option.description}
                      </Typography>
                    )}
                  </div>
                )}
              </SelectItem>
            ))
          ) : (
            <div className="px-4 py-6 text-body-sm">{emptyText}</div>
          )}
        </SelectContent>
      </Select>

      {error && <FieldErrorText error={error} />}
      {hint && !error && <FieldHelperText hint={hint} />}
    </div>
  );
};

export default DropdownInput;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    error?: string;
  }
>(({ className, children, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      " flex items-center w-full rounded-[15px] justify-between px-4 py-2 bg-[#F9F9F9] border border-[#EFEFEF] hover:border-black focus-visible:border-black outline-none text-body-xs disabled:bg-light-grey disabled:border-mid-grey ring-offset-0 disabled:text-dark-grey disabled:placeholder:text-dark-grey placeholder:text-[12px] text-[13px] placeholder:leading-[18px] placeholder:text-[#B5B5B5] disabled:text-opacity-90 disabled:cursor-not-allowed [&>span]:truncate group transition-all duration-300 ease-in-out",
      {
        "": !error && !props.disabled,
        " border-danger ring-2 ring-danger text-danger ": !!error,
        "text-charcoal-grey": !props.value,
      },
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <BiChevronDown
        size={20}
        color="inherit"
        className="size-5 opacity-50 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-300 "
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <BiChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <BiChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    usePortal?: boolean;
    value?: string;
    handleValueChange: (value: string) => void;
    clearSelectionText?: string;
    enableClearSelection?: boolean;
  }
>(
  (
    {
      className,
      children,
      position = "popper",
      usePortal,
      value,
      handleValueChange,
      clearSelectionText = "Clear Selection",
      enableClearSelection = true,
      ...props
    },
    ref
  ) => {
    const Portal = usePortal ? SelectPrimitive.Portal : React.Fragment;

    return (
      <Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-32 w-full overflow-hidden rounded-2xl border bg-white border-mid-grey text-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-2 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width)",
            className
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport className={cn()}>
            {children}
          </SelectPrimitive.Viewport>
          {!!value && !!enableClearSelection && (
            <div className="bg-light-grey px-4 py-2.5 border-t border-mid-grey">
              <Button
                onClick={() => handleValueChange("")}
                className=" flex w-full h-[30px] text-xs font-semibold"
              >
                {clearSelectionText}
              </Button>
            </div>
          )}
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </Portal>
    );
  }
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex justify-between items-center  w-full cursor-pointer select-none py-2.5 px-4 text-sm outline-none focus:bg-light-grey  data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <SelectPrimitive.ItemIndicator>
      <BiCheck size={16} />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
