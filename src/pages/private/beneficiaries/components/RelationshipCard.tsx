import Icons from "@/components/common/Icons";
import Typography from "@/components/common/Typography";

const RelationshipCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: { name: string; bg: string; color: string };
}) => {
  return (
    <div className="space-y-4 border border-mid-grey p-2 rounded-lg">
      <div
        style={{ backgroundColor: icon?.bg }}
        className="inline-block rounded-lg p-1.5"
      >
        <Icons iconName={icon?.name} fill={icon.color} />
      </div>

      <div className="space-y-1">
        <Typography variant={"xSmallText"} className="text-charcoal-gray">
          {title}
        </Typography>
        <Typography variant={"smallTextBold"}>{description}</Typography>
      </div>
    </div>
  );
};

export default RelationshipCard;
