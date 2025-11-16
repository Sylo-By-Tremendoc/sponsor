"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { HiCheck } from "react-icons/hi";
import { cn } from "../../utils/class-name";
import { FieldLabelText } from "./FormHelper";

type CheckboxVariant = "default" | "secondary" | "danger";

const variantClasses: Record<CheckboxVariant, string> = {
  default:
    "border-midGrey bg-feintGrey data-[state=checked]:bg-primary data-[state=checked]:text-white",
  secondary:
    " data-[state=checked]:border-primary data-[state=checked]:bg-white data-[state=checked]:text-primary",
  danger:
    "border-red-500 bg-red-100 data-[state=checked]:bg-red-600 data-[state=checked]:text-white",
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    variant?: CheckboxVariant;
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClass = variantClasses[variant];

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer rounded border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClass,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current w-[90%]")}
      >
        <HiCheck className="stroke-[0.7px] transition-opacity duration-200" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

interface CheckBoxInputProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  width?: string;
  height?: string;
  register?: any;
  variant?: CheckboxVariant;
}

const CheckBoxInput = ({
  id,
  name,
  label,
  required,
  checked,
  onChange,
  width = "1.3rem",
  height = "1.3rem",
  register,
  ...rest
}: CheckBoxInputProps) => {
  const inputId = id || name;

  return (
    <label className="flex items-center gap-2">
      <Checkbox
        id={inputId}
        required={required}
        checked={checked}
        variant={rest.variant}
        onCheckedChange={(checked) => onChange?.(!!checked)}
        style={{
          width,
          height,
          display: "flex",
          padding: "0.5px",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        {...rest}
      />
      {label && <FieldLabelText label={label} required={required} />}
    </label>
  );
};

export default CheckBoxInput;
