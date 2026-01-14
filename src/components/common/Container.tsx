import React from "react";
import { cn } from "@/utils/class-name";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn("pt-2 md:pt-4 pb-10", className)} {...rest}>
        {children}
      </div>
    );
  }
);

export default Container;
