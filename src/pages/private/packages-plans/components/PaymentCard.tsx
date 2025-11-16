import { FieldLabelText } from "@/components/common/FormHelper";
import Icons from "@/components/common/Icons";
import Typography from "@/components/common/Typography";
import { HiOutlineTrash } from "react-icons/hi";

export type PaymentCardProps = {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  type?: "default" | "secondary";
  onDelete?: (val: any) => void;
};

const PaymentCard = ({
  id,
  cardHolderName,
  cardNumber,
  expiryDate,
  cvc,
  type = "default",
  onDelete,
}: PaymentCardProps) => {
  // Show only last 3 digits
  const maskedNumber = `XXXX XXXX XXXX ${cardNumber.slice(-3)}`;

  return (
    <div
      className={`flex flex-col justify-between gap-5 p-4 border rounded-2xl min-h-[187px] ${
        type === "default"
          ? "bg-white border-mid-grey"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="space-y-1">
        <Typography variant={"mediumTextSemibold"}>{cardHolderName}</Typography>
        <Typography variant={"xSmallText"} className="text-charcoal-gray">
          {type === "default" ? "Default Payment Method" : "Secondary Card"}
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
                if (!expiryDate) return "";
                const date = new Date(expiryDate);
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear().toString().slice(-2); // last 2 digits
                return `${month}/${year}`;
              })()}
            </Typography>
          </div>
          <div>
            <FieldLabelText view label="CVC" />
            <Typography variant={"xSmallTextBold"} className="mt-1">
              {cvc}
            </Typography>
          </div>
        </div>

        <button
          className="bg-feint-grey hover:bg-light-danger rounded-lg p-2 cursor-pointer"
          onClick={() =>
            onDelete?.({
              id,
              cardHolderName,
              cardNumber,
              expiryDate,
              cvc,
            })
          }
        >
          <HiOutlineTrash className="text-danger" />
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
