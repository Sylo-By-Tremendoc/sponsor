import { Button } from "@/components/common/Button";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import LineThrough from "@/components/common/LineThrough";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import { convertPrice } from "@/utils/constant";
import { useState } from "react";
import { toast } from "react-toastify";
import type { BeneficiaryInfo } from "./BeneficiaryInformationCard";
import type { PaymentCardInfo } from "../../components/PaymentCard";
import { cn } from "@/utils/class-name";

const PaymentSummary = ({
  beneficiaries,
  paymentCardDetails,
  handleMakePayment,
  className,
}: {
  className?: string;
  beneficiaries: BeneficiaryInfo[];
  paymentCardDetails: PaymentCardInfo;
  handleMakePayment: () => void;
}) => {
  const [paymentTerms, setPaymentTerms] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-white border border-mid-grey py-5 px-1 rounded-2xl space-y-4",
        className
      )}
    >
      <Typography variant={"largeText"} className="px-3">
        Payment Summary
      </Typography>

      <LineThrough />

      <div className="flex-1 overflow-auto px-3 pt-1">
        <div className="border border-dashed border-primary bg-light-green p-4 rounded-xl space-y-2">
          <Typography variant={"mediumText"}>Easy Care (Individual)</Typography>
          <Typography variant={"smallText"} className="text-charcoal-gray">
            Lorem Ipsum is simply dummy text of the printing industry.
          </Typography>
        </div>

        <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

        <div className="space-y-2.5 mb-6">
          <Typography variant={"mediumText"}>Payment Breakdown</Typography>

          <div className="space-y-1">
            <div className="flex justify-between">
              <Typography variant={"smallText"}>Package × 1</Typography>
              <Typography variant={"smallText"}>
                {convertPrice(7.99)}
              </Typography>
            </div>

            <div className="flex justify-between">
              <Typography variant={"smallText"}>
                Taxes and Surcharges
              </Typography>
              <Typography variant={"smallText"}>{convertPrice(1.0)}</Typography>
            </div>
          </div>
        </div>

        <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

        <div className="flex justify-between items-end gap-3">
          <div className="space-y-2 flex-1">
            <Typography variant={"xxSmallText"} className="text-charcoal-gray">
              Enter promo code or gift card number
            </Typography>
            <TextInput placeholder="Promo code or gift card" />
          </div>
          <button className="text-xs text-primary border border-primary h-full py-2.5 px-3 rounded-xl shrink-0">
            Apply
          </button>
        </div>

        <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

        <div className="flex justify-between items-center gap-3 mb-4">
          <Typography variant={"largeText"}>Total</Typography>
          <Typography variant={"largeText"}>{convertPrice(8.99)}</Typography>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <CheckBoxInput
            checked={paymentTerms}
            onChange={() => setPaymentTerms(!paymentTerms)}
          />
          <Typography variant={"xSmallText"} className="text-charcoal-gray">
            I agree to the{" "}
            <a href="" target="_blank" className="text-primary underline">
              payment terms and refund policy
            </a>{" "}
          </Typography>
        </label>

        <Button
          className="w-full"
          disabled={beneficiaries.length === 0 || paymentCardDetails === null}
          onClick={() => {
            if (!paymentTerms) {
              toast.error(
                "Please agree to all plan terms and payment terms before proceeding."
              );

              return;
            }

            handleMakePayment();
          }}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentSummary;
