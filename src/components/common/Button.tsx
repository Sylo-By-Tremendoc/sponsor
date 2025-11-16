"use client";

import { type ButtonHTMLAttributes, forwardRef, type JSX } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { TbLoader3 } from "react-icons/tb";
import * as Slot from "@radix-ui/react-slot";
import { cn } from "../../utils/class-name";

export const buttonVariants = cva(
  // Base styles
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none outline-none font-bold focus-visible:ring-[3px] focus-visible:ring-light-grey cursor-pointer",
  {
    variants: {
      variant: {
        filled:
          "bg-primary hover:opacity-90 w-fit hover:shadow-[0px_1px_2px_0px_#10182808] focus-visible:ring-primary/30",
        outline:
          "bg-transparent border border-mid-gre hover:border-mid-grey hover:shadow-[0px_4px_4px_0px_#335F3240] w-fit focus-visible:ring-primary/30",
        ghost: "hover:bg-light-grey hover:text-deep-black",
        "outline-danger":
          "bg-transparent border-2 border-danger text-danger hover:border-danger hover:text-danger hover:shadow-[0px_4px_4px_0px_#335F3240] w-fit",
        danger:
          "bg-danger-light border-2 border-danger hover:opacity-90 text-danger w-fit focus-visible:ring-danger/30",
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
        true: "cursor-not-allowed",
      },
      glow: {
        true: "relative z-[2] [&+.glow]:absolute [&+.glow]:z-[1] [&+.glow]:inset-0 [&+.glow]:rounded-full [&+.glow]:animate-sonar-glow",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        disabled: true,
        className: "bg-light-grey text-charcoal-gray",
      },
      {
        variant: "outline",
        disabled: true,
        className: "border-mid-grey text-[#B0B0B0] text-charcoal-grey",
      },
      {
        variant: "filled",
        glow: true,
        className: "[&+.glow]:bg-primary/50",
      },
      {
        variant: "outline",
        glow: true,
        className: "[&+.glow]:bg-primary/50 bg-background",
      },
      {
        variant: "outline-danger",
        glow: true,
        className: "[&+.glow]:bg-danger/75 bg-background",
      },
      {
        variant: "danger",
        glow: true,
        className: "[&+.glow]:bg-danger/75",
      },
    ],
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
            " relative inline-flex items-center justify-center w-fit h-fit ",
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
            {icon && icon}
            <Slot.Slottable>{children}</Slot.Slottable>
            {isLoading && (
              <TbLoader3 className="animate-spin size-5" aria-hidden="true" />
            )}
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
        {icon && icon}
        <Slot.Slottable>{children}</Slot.Slottable>
        {isLoading && (
          <TbLoader3 className="animate-spin size-5" aria-hidden="true" />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
