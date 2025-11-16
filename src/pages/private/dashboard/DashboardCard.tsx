import Icons from "@/components/common/Icons";
import Typography from "@/components/common/Typography";

const DashboardCard = ({
  title,
  icon,
  count,
}: {
  title: string;
  icon: {
    name: string;
    color: string;
  };
  count: number;
}) => {
  return (
    <div className="flex flex-col gap-4 h-full p-4 border border-[#535353] rounded-2xl">
      <div className="flex justify-between items-center gap-5">
        <Typography variant={"mediumText"}>{title}</Typography>
        <div style={{backgroundColor: icon?.color}} className="p-1.5 rounded-lg">
          <Icons iconName={icon?.name} />
        </div>
      </div>

      <Typography variant={"xxlargeTextSemibold"}>{count}</Typography>
    </div>
  );
};

export default DashboardCard;
