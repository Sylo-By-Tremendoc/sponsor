import { cn } from "../../utils/class-name";
import Typography from "./Typography";

const Pill = ({ text, className }: { text: string; className?: string }) => {
  return (
    <Typography
      variant={"xxSmallText"}
      className={cn(
        "inline-block px-4 py-1 border border-gray-400 rounded-full",
        className
      )}
    >
      {text}
    </Typography>
  );
};

export default Pill;
