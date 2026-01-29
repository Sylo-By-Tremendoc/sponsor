import clsx from "clsx";
import { cn } from "../../utils/class-name";
import Typography from "./Typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import Icons from "./Icons";
import type { ReactNode } from "react";
import SkeletonLoader from "./SkeletonLoader";

export const FieldLabelText = ({
  label,
  info,
  required = false,
  view,
  className,
}: {
  label: ReactNode;
  className?: string;
  view?: boolean;
  info?: string;
  required?: boolean;
}) => (
  <div className={cn(className)}>
    <Typography
      as={"span"}
      variant={view ? "xSmallText" : "xSmallTextSemibold"}
      className={clsx("", view && "text-charcoal-gray", {
        " after:content-['*'] after:ml-0.5 after:text-danger": required,
      })}
    >
      {label}
    </Typography>

    {info && (
      <Tooltip>
        <TooltipTrigger className="pl-1">
          <TooltipContent side="right" sideOffset={8} className="bg-white mr-">
            <Typography variant="subText" className="pl-[5px] max-w-60">
              {info}
            </Typography>
          </TooltipContent>

          <Icons
            iconName={"info"}
            className="w-4 h-4 border-2 border-primary rounded-full p-0.5 cursor-pointer"
          />
        </TooltipTrigger>
      </Tooltip>
    )}
  </div>
);

export const FieldErrorText = ({
  error,
  className,
}: {
  error: string;
  className?: string;
}) => (
  <p className={cn("text-xs font-normal text-danger", className)}>{error}</p>
);

export const FieldHelperText = ({
  hint,
  className,
}: {
  hint: ReactNode;
  className?: string;
}) => (
  <Typography
    variant={"subText"}
    className={cn("text-[#667085] leading-4", className)}
  >
    {hint}
  </Typography>
);

export const FieldLoadingState = ({ className }: { className?: string }) => (
  <SkeletonLoader className={cn("w-full h-[40px] mt-1 rounded-[15px]", className)} />
);
