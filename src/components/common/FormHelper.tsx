import clsx from "clsx";
import { cn } from "../../utils/class-name";
import Typography from "./Typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import Icons from "./Icons";

export const FieldLabelText = ({
  label,
  info = false,
  required = false,
  infoDescription,
  view,
  className,
}: {
  label: string;
  className?: string;
  view?: boolean;
  info?: boolean;
  infoDescription?: string;
  required?: boolean;
}) => (
  <div className={cn(className)}>
    {info && (
      <Tooltip>
        <TooltipTrigger>
          <TooltipContent side="right" sideOffset={8} className="bg-white mr-">
            <Typography variant="subText" className="pl-[5px] max-w-60">
              {infoDescription}
            </Typography>
          </TooltipContent>

          <Icons
            iconName={"info"}
            className="w-4 h-4 border-2 border-primary rounded-full p-0.5 cursor-pointer mb-2"
          />
        </TooltipTrigger>
      </Tooltip>
    )}

    <Typography
      as={"span"}
      variant={view ? "xSmallText" : "xSmallTextSemibold"}
      className={clsx("", view && "text-charcoal-gray", {
        " after:content-['*'] after:ml-0.5 after:text-danger": required,
      })}
    >
      {label}
    </Typography>
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
  hint: string;
  className?: string;
}) => (
  <Typography
    variant={"subText"}
    className={cn("text-[#667085] leading-4", className)}
  >
    {hint}
  </Typography>
);
