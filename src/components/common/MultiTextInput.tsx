import React from "react";
import clsx from "clsx";
import { cn } from "../../utils/class-name.ts";
import SkeletonLoader from "./SkeletonLoader.tsx";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper.tsx";

type MultiTextInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  isLoadingFelid?: boolean;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const MultiTextInput = React.forwardRef<
  HTMLTextAreaElement,
  MultiTextInputProps
>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      isLoadingFelid,
      required,
      ...rest
    },
    ref
  ) => {
    return (
      <div className=" space-y-1.5">
        <label className=" space-y-1">
          {label && <FieldLabelText label={label} required={required} />}

          {isLoadingFelid ? (
            <SkeletonLoader className="w-28 h-[1.2rem] mt-1 rounded" />
          ) : (
            <>
              {!!leftIcon && (
                <span
                  className={clsx(" absolute left-4", {
                    " text-offBlack": !error && !rest.disabled,
                    " opacity-50": rest.disabled,
                    " text-danger": error,
                  })}
                  role="icon"
                >
                  {leftIcon}
                </span>
              )}

              <textarea
                ref={ref}
                className={cn(
                  "flex min-h-[120px] w-full rounded-[15px] bg-[#F9F9F9] border border-[#EFEFEF] hover:border-primary focus-visible:border-primary  px-3 py-2 text-sm ring-offset-transparent placeholder:text-[0.8rem] placeholder:font-thin text-offBlack  focus-visible:outline-none outline-none  disabled:cursor-not-allowed disabled:bg-lightGrey disabled:border-midGrey disabled:text-darkGrey disabled:placeholder:text-darkGrey transition-all duration-300 ease-in-out",
                  {
                    "": !error && !rest.disabled,
                    " border-danger border-2 text-danger ": !!error,
                    " pl-10": !!leftIcon,
                    " pr-10": !!rightIcon,
                  },
                  className
                )}
                {...rest}
              />

              {rightIcon && (
                <span
                  className={clsx(" absolute right-4", {
                    " text-offBlack": !error && !rest.disabled,
                    " opacity-50": rest.disabled,
                    " text-danger": error,
                  })}
                  role="icon"
                >
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </label>

        {error && <FieldErrorText error={error} />}
        {hint && !error && <FieldHelperText hint={hint} />}
      </div>
    );
  }
);
MultiTextInput.displayName = "MultiTextInput";

export default MultiTextInput;
