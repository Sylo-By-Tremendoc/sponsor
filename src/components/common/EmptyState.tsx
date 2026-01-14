import Icons from "@/components/common/Icons";
import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";

const EmptyState = ({
  title,
  description,
  iconName,
  buttonText,
  onButtonClick,
}: {
  title: string;
  description: string;
  iconName: string;
  buttonText?: string;
  onButtonClick?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Icons iconName={iconName} className="text-primary" />
      </div>

      <Typography variant="mediumText" className="font-semibold mb-2">
        {title}
      </Typography>

      <Typography
        variant="xSmallText"
        className="text-charcoal-gray max-w-sm mb-6"
      >
        {description}
      </Typography>

      {buttonText && onButtonClick && (
        <Button
          variant="outline"
          className="flex items-center gap-2 px-6 py-3"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
