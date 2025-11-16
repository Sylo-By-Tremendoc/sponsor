import Icons from "@/components/common/Icons";
import Typography from "@/components/common/Typography";

const AnalyticsCard = ({
  title,
  date,
  icon,
}: {
  title: string;
  date: string;
  icon: { name: string; bg: string; color: string };
}) => {
  return (
    <div className="space-y-2 bg-white p-3 rounded-2xl border border-mid-grey">
      <div className="flex justify-between items-center gap-5">
        <Typography variant={"smallText"} className="text-charcoal-gray">
          {title}
        </Typography>
        <div
          style={{ backgroundColor: icon?.bg }}
          className="inline-block rounded-lg p-1.5"
        >
          <Icons iconName={icon?.name} fill={icon?.color} />
        </div>
      </div>

      <Typography variant={"mediumTextSemibold"}>{date}</Typography>
    </div>
  );
};

export default AnalyticsCard;
