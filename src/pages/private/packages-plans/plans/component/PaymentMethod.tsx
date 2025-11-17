import Typography from "@/components/common/Typography";
import * as yup from "yup";
import PaymentCard, {
  type PaymentCardInfo,
} from "../../components/PaymentCard";
import { Button } from "@/components/common/Button";
import { HiOutlinePlus } from "react-icons/hi";

const PaymentMethod = ({
  paymentCardDetails,
  handleAddCardDetails,
  handleDeleteCardDetails,
}: {
  paymentCardDetails: PaymentCardInfo;
  handleAddCardDetails: () => void;
  handleDeleteCardDetails: () => void;
}) => {
  return (
    <section className="space-y-4">
      {paymentCardDetails ? (
        <div className="space-y-3 bg-white border border-mid-grey rounded-2xl p-5">
          <Typography variant={"largeText"}>Payment Method</Typography>

          <PaymentCard
            cardDetails={paymentCardDetails}
            onDelete={handleDeleteCardDetails}
            className="shadow-sm hover:shadow-md transition-all duration-200"
          />
        </div>
      ) : (
        <Button className="w-full text-white" onClick={handleAddCardDetails}>
          Add Payment Card
          <HiOutlinePlus className="text-white" />
        </Button>
      )}
    </section>
  );
};

export default PaymentMethod;

export const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),

  cardHolderName: yup
    .string()
    .required("Card holder's name is required")
    .min(3, "Name is too short"),

  expiryDate: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),

  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits"),

  transactionPin: yup
    .string()
    .required("Transaction PIN is required")
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits"),

  saveCard: yup.boolean().optional(),
});
