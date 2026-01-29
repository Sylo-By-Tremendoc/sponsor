import { FieldLabelText } from "@/components/common/FormHelper";
import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";
import type { PaymentCardInfo } from "@/types/plans";
import { cn } from "@/utils/class-name";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

export const PaymentCard = ({
  cardDetails,
  onDelete,
  className,
}: {
  cardDetails: PaymentCardInfo;
  onDelete?: (val: PaymentCardInfo) => void;
  className?: string;
}) => {
  const maskedNumber = `XXXX XXXX XXXX ${cardDetails.last4}`;

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-5 p-4 border rounded-2xl min-h-[187px] bg-white border-mid-grey",
        className,
      )}
    >
      <div className="space-y-1">
        <Typography variant={"mediumTextSemibold"}>
          {cardDetails.brand.toUpperCase()} Card
        </Typography>
        <Typography variant={"xSmallText"} className="text-charcoal-gray">
          {cardDetails.is_default ? "Default Payment Method" : "Secondary Card"}
        </Typography>
      </div>

      <div className="flex items-center gap-2">
        <Icons iconName="paymentCard" />
        <Typography className="font-black text-2xl">{maskedNumber}</Typography>
      </div>

      <div className="flex justify-between items-end gap-5">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <FieldLabelText view label="Expires" />
            <Typography variant={"xSmallTextBold"} className="mt-1">
              {`${cardDetails.exp_month.toString().padStart(2, "0")}/${cardDetails.exp_year.toString().slice(-2)}`}
            </Typography>
          </div>
        </div>

        {onDelete && (
          <button
            className="bg-feint-grey hover:bg-light-danger rounded-lg p-2 cursor-pointer"
            onClick={() => onDelete(cardDetails)}
          >
            <HiOutlineTrash className="text-danger" />
          </button>
        )}
      </div>
    </div>
  );
};

export const PaymentCardLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-5 p-4 border rounded-2xl min-h-[187px] bg-white border-mid-grey animate-pulse",
        className,
      )}
    >
      <div className="space-y-1">
        <SkeletonLoader className="h-5 w-32 bg-gray-300 rounded" />
        <SkeletonLoader className="h-3 w-24 rounded" />
      </div>

      <div className="flex items-center gap-2">
        <SkeletonLoader className="h-6 w-6 bg-gray-300 rounded-full" />
        <SkeletonLoader className="h-8 w-36 bg-gray-300 rounded" />
      </div>

      <div className="flex justify-between items-end gap-5">
        <div className="flex items-center gap-5">
          <div>
            <SkeletonLoader className="h-3 w-16 rounded mb-1" />
            <SkeletonLoader className="h-4 w-12 bg-gray-300 rounded" />
          </div>
        </div>

        <SkeletonLoader className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
};

export const NoPaymentCardDetails = () => {
  return (
    <div
      className="flex flex-col justify-center items-center gap-1 border border-dashed rounded-lg cursor-pointer"
      style={{
        borderWidth: "2px",
        borderColor: "#ccc",
        borderStyle: "dashed",
      }}
    >
      <div className="p-1 bg-primary rounded-full">
        <HiOutlinePlus size={25} className="text-white" />
      </div>
      <Typography
        variant={"smallText"}
        className="font-medium text-charcoal-gray"
      >
        No Card Details
      </Typography>
    </div>
  );
};
