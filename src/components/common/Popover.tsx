"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../utils/class-name";

const Popover = PopoverPrimitive.Root;

const OpenPopoverBtn = PopoverPrimitive.Trigger;
const ClosePopoverBtn = PopoverPrimitive.Close;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    sameWidthAsTrigger?: boolean;
  }
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      sameWidthAsTrigger,
      ...props
    },
    ref
  ) => (
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-3xl border border-midGrey bg-white p-4 text-offBlack shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          sameWidthAsTrigger &&
            " w-full min-w-(--radix-popover-trigger-width)",
          className
        )}
        {...props}
      />
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, OpenPopoverBtn, PopoverContent, ClosePopoverBtn };