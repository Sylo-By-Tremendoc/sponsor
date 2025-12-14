import { FieldLabelText } from "@/components/common/FormHelper";
import Icons from "@/components/common/Icons";
import Typography from "@/components/common/Typography";
import { cn } from "@/utils/class-name";
import { HiOutlineTrash } from "react-icons/hi";

export type PaymentCardInfo = {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  type?: string;
  saveCard?: boolean;
};

const PaymentCard = ({
  cardDetails,
  onDelete,
  className,
}: {
  cardDetails: PaymentCardInfo;
  onDelete?: (val: any) => void;
  className?: string;
}) => {
  // Show only last 3 digits
  const maskedNumber = `XXXX XXXX XXXX ${cardDetails?.cardNumber.slice(-3)}`;

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-5 p-4 border rounded-2xl min-h-[187px] bg-white border-mid-grey",
        className
      )}
    >
      <div className="space-y-1">
        <Typography variant={"mediumTextSemibold"}>
          {cardDetails?.cardHolderName}
        </Typography>
        <Typography variant={"xSmallText"} className="text-charcoal-gray">
          {cardDetails?.type === "default"
            ? "Default Payment Method"
            : "Secondary Card"}
        </Typography>
      </div>

      <div className="flex items-center gap-2">
        <Icons iconName="paymentCard" />
        <Typography className="font-black text-2xl">{maskedNumber}</Typography>
      </div>

      <div className="flex justify-between items-end gap-5">
        <div className="flex items-center gap-5">
          <div>
            <FieldLabelText view label="Expires" />
            <Typography variant={"xSmallTextBold"} className="mt-1">
              {(() => {
                if (!cardDetails?.expiryDate) return "";
                const date = new Date(cardDetails?.expiryDate);
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear().toString().slice(-2);
                return `${month}/${year}`;
              })()}
            </Typography>
          </div>
          <div>
            <FieldLabelText view label="CVC" />
            <Typography variant={"xSmallTextBold"} className="mt-1">
              {cardDetails?.cvc}
            </Typography>
          </div>
        </div>

        <button
          className="bg-feint-grey hover:bg-light-danger rounded-lg p-2 cursor-pointer"
          onClick={() => onDelete?.(cardDetails)}
        >
          <HiOutlineTrash className="text-danger" />
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
