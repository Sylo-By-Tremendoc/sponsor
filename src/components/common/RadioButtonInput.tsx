import * as RadioGroup from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import React from "react";
import { FieldLabelText } from "./FormHelper";

interface RadioButtonInputProps {
  value: string;
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
}

const radioItemStyles = cva(
  "w-4 h-4 rounded-full border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary",
  {
    variants: {
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const RadioButtonInput: React.FC<RadioButtonInputProps> = ({
  value,
  label,
  required,
  disabled,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <RadioGroup.Item
        value={value}
        className={radioItemStyles({ disabled }) + " border-gray-400"}
        disabled={disabled}
      >
        <RadioGroup.Indicator className="w-2 h-2 bg-primary rounded-full" />
      </RadioGroup.Item>

      {label && <FieldLabelText label={label} required={required} />}
    </label>
  );
};
