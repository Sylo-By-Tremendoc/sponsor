import * as RadioGroup from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import React from "react";
import { FieldLabelText } from "./FormHelper";

interface RadioButtonInputProps {
  value: string;
  label: string;
  name: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const radioItemStyles = cva(
  "w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary",
  {
    variants: {
      checked: {
        true: "border-primary bg-primary",
        false: "border-gray-400 bg-white",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

export const RadioButtonInput: React.FC<RadioButtonInputProps> = ({
  value,
  label,
  // name,
  required,
  checked,
  onChange,
  disabled,
  // className,
}) => {
  return (
    <RadioGroup.Root
      value={checked ? value : undefined}
      onValueChange={onChange}
      className="flex items-center gap-2"
      disabled={disabled}
    >
      <RadioGroup.Item
        value={value}
        className={radioItemStyles({ checked: !!checked, disabled })}
        id={value}
      >
        <RadioGroup.Indicator className="w-2 h-2 bg-white rounded-full" />
      </RadioGroup.Item>
      <label htmlFor={value} className="text-sm select-none cursor-pointer">
        {label && <FieldLabelText label={label} required={required} />}
      </label>
    </RadioGroup.Root>
  );
};
