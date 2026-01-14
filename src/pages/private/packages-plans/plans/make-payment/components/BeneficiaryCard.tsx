import CheckBoxInput from "@/components/common/CheckBoxInput";
import Typography from "@/components/common/Typography";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { cn } from "@/utils/class-name";
import { defaultImages } from "@/utils/constant";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export type BeneficiaryCardProps = {
  showCheckBox?: boolean;
  beneficiary: BeneficiariesParams;
  isSelected?: boolean;
  className?: string;
  onSelect?: (id: string) => void;
  onDelete?: () => void;
};

export const BeneficiaryCard = ({
  isSelected,
  showCheckBox,
  onSelect,
  beneficiary,
  className,
}: BeneficiaryCardProps) => {
  return (
    <div
      className={cn(
        "space-y-1 p-4 border hover:border-primary rounded-[16px] cursor-pointer",
        {
          "border-primary bg-primary/5 ring-1 ring-primary/20": isSelected,
          "border-[#EFEFEF] hover:border-primary/40": !isSelected,
        },
        className
      )}
      onClick={() => onSelect && onSelect(beneficiary?.id)}
    >
      <div className="flex items-start justify-between">
        <img
          src={defaultImages.avatar}
          alt="Beneficiary avatar"
          className="w-12 h-12 rounded-full border flex-shrink-0"
        />
        {showCheckBox && <CheckBoxInput checked={isSelected} />}
      </div>

      <Typography variant="smallTextSemibold" className="truncate">
        {beneficiary.first_name} {beneficiary.last_name}
      </Typography>

      {beneficiary.phone && (
        <div className="flex items-center gap-1 text-charcoal-gray">
          <HiOutlinePhone className="w-4 h-4" />
          <Typography variant="xSmallText">{beneficiary.phone}</Typography>
        </div>
      )}

      {beneficiary.email && (
        <a
          href={`mailto:${beneficiary.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <HiOutlineMail className="w-4 h-4" />
          <Typography variant="xSmallText" className="truncate">
            {beneficiary.email}
          </Typography>
        </a>
      )}
    </div>
  );
};

export const BeneficiaryCardLoader = () => {
  return (
    <div className="space-y-1 p-4 border hover:border-primary rounded-[16px] cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="w-[69px] h-[69px] bg-gray-200 rounded-full animate-pulse" />

        <div className="flex items-center gap-3">
          <div className="w-[80px] h-[24px] bg-gray-200 animate-pulse rounded-full" />
          <CheckBoxInput width="16px" height="16px" checked={false} />
        </div>
      </div>

      <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded-full" />
      <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded-full" />
      <div className="w-[120px] h-[20px] bg-gray-200 animate-pulse rounded-full" />
    </div>
  );
};
