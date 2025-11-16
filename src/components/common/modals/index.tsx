"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../../utils/class-name";
import { HiOutlineX } from "react-icons/hi";

const Modal = DialogPrimitive.Root;
const OpenModal = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;
const CloseModal = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-[400px] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]  bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-[10px] outline-none",
        className
      )}
      {...props}
    >
      <ModalTitle></ModalTitle>
      {children}
    </DialogPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
  className,
  title,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { title?: string }) => (
  <div
    className={cn(
      "flex justify-between text-center sm:text-left bg-offBlack border-b-midGrey text-white py-2 px-4 rounded-t-[10px]",
      className
    )}
    {...props}
  >
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    {props.children}
    <DialogPrimitive.Close className="outline-none border-none p-1">
      <HiOutlineX />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </div>
);
ModalHeader.displayName = "DialogHeader";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {props.children}
  </DialogPrimitive.Title>
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalBody = ({
  children,
  borderRounded = true, // if modal has a footer, set borderRounded to false
  className = "",
}: React.PropsWithChildren<{
  borderRounded?: boolean;
  className?: string;
}>) => (
  <div
    className={cn(
      " p-4 bg-white border border-midGrey rounded-b-[10px]",
      {
        "rounded-b-none border-b-0": !borderRounded,
      },
      className
    )}
  >
    {children}
  </div>
);

export {
  Modal,
  ModalContent,
  OpenModal,
  CloseModal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalPortal,
};
