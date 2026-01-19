import { useMemo } from "react";
import { FieldLabelText } from "./FormHelper";

const BalanceSlider = ({
  label = "Balance",
  value,
  min = 0,
  max,
  currency,
  step = 0.01,
  onChange,
}: {
  label?: string;
  value: number;
  min?: number;
  max: number;
  currency?: string;
  step?: number;
  onChange: (value: number) => void;
}) => {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  return (
    <div className="w-full space-y-3">
      {/* Label + Value */}
      <div className="flex items-center justify-between">
        {label && <FieldLabelText label={label} />}
        <span className="text-sm font-medium text-charcoal-gray">{currency && currency}{value}</span>
      </div>

      <div className="relative w-full">
        {/* Base Track */}
        <div className="h-2 w-full rounded-full bg-gray-200" />

        {/* Active Track */}
        <div
          className="absolute top-0 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />

        {/* Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
        absolute top-1/2 -translate-y-1/2
        w-full appearance-none bg-transparent
        cursor-pointer
        focus:outline-none
        slider-thumb
      "
        />
      </div>
    </div>
  );
};

export default BalanceSlider;
