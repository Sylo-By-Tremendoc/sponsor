import React from "react";
import clsx from "clsx";
import { BiSearch } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FieldErrorText, FieldHelperText, FieldLabelText } from "./FormHelper";
import SkeletonLoader from "./SkeletonLoader";
import { cn } from "../../utils/class-name";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  hint?: string | any;
  height?: string;
  searchIconSize?: number;
  isLoadingFelid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

// forward ref
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      error,
      leftIcon,
      rightIcon,
      label,
      hint,
      className,
      type,
      searchIconSize = 20,
      height = "40px",
      isLoadingFelid,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="space-y-1.5">
        <label className="flex flex-col space-y-1">
          {label && (
            <div className="label-container">
              <FieldLabelText label={label} required={rest.required} />
            </div>
          )}
          {isLoadingFelid ? (
            <SkeletonLoader className="w-28 h-[1.2rem] mt-1 rounded" />
          ) : (
            <div className={" relative flex items-center w-full"}>
              {!!leftIcon && type !== "search" && (
                <span
                  className={clsx("absolute left-4", {
                    " text-primary": !error && !rest.disabled,
                    " opacity-50": rest.disabled,
                    " text-danger": error,
                  })}
                  role="icon"
                >
                  {leftIcon}
                </span>
              )}

              {type == "search" && (
                <span
                  className={clsx("absolute left-4 top-[9px]", {
                    " text-[#667085]": !error && !rest.disabled,
                    " opacity-50": rest.disabled,
                    " text-danger": error,
                  })}
                  role="icon"
                >
                  <BiSearch size={searchIconSize} color="inherit" />
                </span>
              )}

              <input
                ref={ref}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                className={cn(
                  "flex w-full rounded-[15px] bg-[#F9F9F9] border border-[#EFEFEF] hover:border-primary focus-visible:border-primary px-3 file:border-0 file:bg-transparent file:font-medium placeholder:text-[12px] text-[13px] placeholder:leading-[18px] placeholder:text-[#B5B5B5] focus-visible:outline-none outline-none  disabled:cursor-not-allowed disabled:bg-lightGrey disabled:border-midGrey disabled:text-darkGrey disabled:placeholder:text-darkGrey transition-all duration-300 ease-in-out",
                  {
                    "": !error && !rest.disabled,
                    " border-danger border-2 text-danger ": !!error,
                    " pl-10": !!leftIcon || type === "search",
                    " pr-10": !!rightIcon || type === "password",
                  },
                  className
                )}
                style={{ height }}
                {...rest}
              />

              {rightIcon && type !== "password" && (
                <span
                  className={clsx("absolute right-4", {
                    " text-offBlack": !error && !rest.disabled,
                    " opacity-50": rest.disabled,
                    " text-danger": error,
                  })}
                  role="icon"
                >
                  {rightIcon}
                </span>
              )}

              {type === "password" && (
                <button
                  type="button"
                  className={cn(
                    "cursor-pointer absolute right-4 border-none outline-none py-2",
                    {
                      " opacity-50": rest.disabled,
                      " text-danger": error,
                    }
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? (
                    <BsEye size={20} color="inherit" />
                  ) : (
                    <BsEyeSlash size={20} color="inherit" />
                  )}
                </button>
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

TextInput.displayName = "Input";

export default TextInput;
