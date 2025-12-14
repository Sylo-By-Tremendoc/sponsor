import React from "react";
import { cn } from "@/utils/class-name";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("pt-2 md:pt-4 pb-10", className)}>{children}</div>;
};

export default Container;
