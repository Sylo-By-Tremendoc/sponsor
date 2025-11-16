import { cn } from "@/utils/class-name";

const LineThrough = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <div className={cn("border-t border-[#A1A1A1]")} />
    </div>
  );
};

export default LineThrough;
