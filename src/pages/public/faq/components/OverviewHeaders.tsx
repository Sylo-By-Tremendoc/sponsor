import Typography from "@/components/common/Typography";
import { cn } from "@/utils/class-name";
import type { ReactNode } from "react";

interface OverviewHeaderProps {
  title: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const OverviewHeader = ({
  title,
  icon,
  isActive,
  onClick,
}: OverviewHeaderProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 px-4 py-2 transition",
        "text-sm font-medium",
        isActive
          ? "bg-primary text-black shadow"
          : "bg-[#084637] text-white"
      )}
    >
      <div className="text-lg">{icon}</div>
      <Typography variant={"smallText"}>{title}</Typography>
    </button>
  );
};

export default OverviewHeader;
