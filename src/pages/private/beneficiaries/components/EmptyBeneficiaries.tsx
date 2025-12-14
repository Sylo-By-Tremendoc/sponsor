import Icons from "@/components/common/Icons";
import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { HiOutlinePlus } from "react-icons/hi";

const EmptyBeneficiaries = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-10"
    >
      {/* Icon Circle */}
      <div
        className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6"
      >
        <Icons iconName="user-group" className="text-primary" />
      </div>

      {/* Title */}
      <Typography variant="mediumText" className="font-semibold mb-2">
        No Beneficiaries Added Yet
      </Typography>

      <Typography
        variant="xSmallText"
        className="text-charcoal-gray max-w-sm mb-6"
      >
        Add your first beneficiary to easily manage ownership, permissions, and
        access settings.
      </Typography>

      <Button
        variant={"outline"}
        className="flex items-center gap-2 px-6 py-3"
        onClick={onAdd}
      >
        <HiOutlinePlus /> Add Beneficiary
      </Button>
    </div>
  );
};

export default EmptyBeneficiaries;
