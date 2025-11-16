import { cn } from "@/utils/class-name";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Scroll inside the wrapper if possible
    if (ref.current) {
      ref.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    // Also scroll the window (for layouts that use window scroll)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};
