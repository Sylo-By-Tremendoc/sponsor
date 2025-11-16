import type { ReactNode } from "react";
import Typography from "./Typography";
import { cn } from "../../utils/class-name";

type ActionButtonProps = {
  text: string;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
};

const ActionButton = ({
  text,
  leftIcon,
  rightIcon,
  className,
  onClick,
}: ActionButtonProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border rounded-full px-4 py-1.5 cursor-pointer h-[35px]",
        className
      )}
      onClick={onClick}
    >
      {leftIcon && <div>{leftIcon}</div>}
      <Typography
        variant={"smallText"}
        className="font-semibold text-[#4B4B4B]"
      >
        {text}
      </Typography>
      {rightIcon && <div>{rightIcon}</div>}
    </div>
  );
};

export default ActionButton;
