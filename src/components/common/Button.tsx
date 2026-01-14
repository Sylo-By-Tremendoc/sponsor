"use client";

import { type ButtonHTMLAttributes, forwardRef, type JSX } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { TbLoader3 } from "react-icons/tb";
import * as Slot from "@radix-ui/react-slot";
import { cn } from "../../utils/class-name";

export const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none outline-none font-bold cursor-pointer",
  {
    variants: {
      variant: {
        filled:
          "bg-primary text-white w-fit focus-visible:ring-[3px] focus-visible:ring-primary/30",
        outline:
          "bg-transparent border border-black text-black w-fit focus-visible:ring-[3px] focus-visible:ring-primary/30",
        ghost: "text-black",
        "outline-danger":
          "bg-transparent border-2 border-danger text-danger w-fit focus-visible:ring-[3px] focus-visible:ring-danger/30",
        danger:
          "bg-danger-light border-2 border-danger text-danger w-fit focus-visible:ring-[3px] focus-visible:ring-danger/30",
        custom: "",
      },
      size: {
        small: "h-[30px] px-4 py-[10px] text-sm font-medium",
        medium: "h-[40px] px-6 py-[10px] text-sm font-medium",
        large: "h-[50px] py-[10px] px-[18px] text-sm font-medium",
        xLarge: "h-[60px] py-[10px] px-[18px] text-sm font-medium",
        icon: "size-10 rounded-sm",
      },
      disabled: {
        true: "cursor-not-allowed bg-light-grey text-charcoal-gray border border-mid-grey opacity-60",
      },
      glow: {
        true: "relative z-[2] [&+.glow]:absolute [&+.glow]:z-[1] [&+.glow]:inset-0 [&+.glow]:rounded-full [&+.glow]:animate-sonar-glow",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "medium",
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: JSX.Element;
  className?: string;
  glow?: boolean;
  glowWrapperClassName?: string;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      isLoading = false,
      icon,
      children,
      type = "button",
      glow = false,
      glowWrapperClassName,
      asChild,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button";

    if (glow) {
      return (
        <div
          className={cn(
            "relative inline-flex items-center justify-center w-fit h-fit",
            glowWrapperClassName
          )}
        >
          <Comp
            ref={ref}
            type={type}
            disabled={disabled ?? isLoading}
            className={cn(
              buttonVariants({
                variant,
                size,
                disabled,
                glow,
              }),
              className
            )}
            {...props}
          >
            {isLoading ? (
              <TbLoader3 className="animate-spin size-5" aria-hidden="true" />
            ) : (
              icon
            )}
            <Slot.Slottable>{children}</Slot.Slottable>
          </Comp>

          <span className="glow" />
        </div>
      );
    }

    return (
      <Comp
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({
            variant,
            size,
            disabled,
            glow,
          }),
          className
        )}
        {...props}
      >
        {isLoading ? (
          <TbLoader3 className="animate-spin size-5" aria-hidden="true" />
        ) : (
          icon
        )}
        <Slot.Slottable>{children}</Slot.Slottable>
      </Comp>
    );
  }
);

Button.displayName = "Button";
