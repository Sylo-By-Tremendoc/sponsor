import { Button } from "@/components/common/Button";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import LineThrough from "@/components/common/LineThrough";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import { convertPrice, replaceEmptyStringsWithNull } from "@/utils/constant";
import { useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/utils/class-name";
import type { BeneficiariesParams } from "@/types/beneficiary";
import type { PlansParam } from "@/types/plans";
import { useCurrencyStore } from "@/store/currency-store";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import useRequestPlanPaymentOTP from "../hooks/use-request-plan-payment-otp";
import { getErrorMessage } from "@/utils/get-error-message";
import useAuth from "@/hooks/use-auth";
import { maskEmail } from "@/utils/formatters";

const PaymentSummary = ({
  plan,
  showHeader = true,
  isLoading,
  beneficiaries,
  onSuccess,
  className,
}: {
  showHeader?: boolean;
  isLoading: boolean;
  className?: string;
  plan: PlansParam;
  beneficiaries: BeneficiariesParams[];
  onSuccess: () => void;
}) => {
  const { authUser } = useAuth();
  const currency = useCurrencyStore((state) => state?.currency);

  const price = Number(plan?.price || 0);
  const serviceCharge = price * 0.05;
  const totalPrice = price + serviceCharge;

  const [paymentTerms, setPaymentTerms] = useState(false);

  const requestPlanPaymentOTP = useRequestPlanPaymentOTP();

  const handleRequestOTP = () => {
    const newData = {
      channel: "email",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    requestPlanPaymentOTP.mutate(submittedData, {
      onSuccess: () => {
        toast.success(
          `We have sent an OTP to your email ${maskEmail(
            authUser?.user?.email
          )}`
        );
        onSuccess();
      },
      onError: (error: Error) => {
        toast.error(
          getErrorMessage(
            error?.message,
            "An error occurred. Please try again."
          )
        );
      },
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white border border-mid-grey py-5 px-1 rounded-2xl space-y-4",
        className
      )}
    >
      {showHeader && (
        <>
          <Typography variant={"largeText"} className="px-3">
            Payment Summary
          </Typography>

          <LineThrough />
        </>
      )}

      <div className="flex-1 overflow-auto px-3 pt-1">
        <div className="border border-dashed border-primary bg-light-green p-4 rounded-xl space-y-2">
          {isLoading ? (
            <SkeletonLoader className="w-20 h-7 rounded-md mb-2" />
          ) : (
            <Typography variant={"mediumText"} className="mb-2">
              {plan?.name || ""}
            </Typography>
          )}

          {isLoading ? (
            <div className="space-y-1">
              <SkeletonLoader className="w-full h-3 rounded-sm" />
              <SkeletonLoader className="w-full h-3 rounded-sm" />
              <SkeletonLoader className="w-full h-3 rounded-sm" />
            </div>
          ) : (
            <Typography
              variant={"smallText"}
              className="text-charcoal-gray line-clamp-3"
            >
              {plan?.description || ""}
            </Typography>
          )}
        </div>

        <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

        <div className="space-y-2.5 mb-6">
          <Typography variant={"mediumText"}>Payment Breakdown</Typography>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Typography variant={"smallText"}>Plan </Typography>
              <Typography variant={"smallText"}>
                {convertPrice(Number(price), currency)}
              </Typography>
            </div>

            <div className="flex justify-between">
              <Typography variant={"smallText"}>Service Charge</Typography>
              <Typography variant={"smallText"}>
                {convertPrice(serviceCharge, currency)}
              </Typography>
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
          <Typography variant={"largeText"}>
            {convertPrice(totalPrice, currency)}
          </Typography>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <CheckBoxInput
            checked={paymentTerms}
            onChange={() => setPaymentTerms(!paymentTerms)}
          />
          <Typography
            variant={"xSmallText"}
            className="text-charcoal-gray mt-[2px]"
          >
            I agree to the{" "}
            <a href="" target="_blank" className="text-primary underline">
              payment terms and refund policy
            </a>{" "}
          </Typography>
        </label>

        <Button
          className="w-full"
          onClick={() => {
            if (!paymentTerms) {
              toast.error(
                "Please agree to all plan terms and payment terms before proceeding."
              );

              return;
            }

            handleRequestOTP();
          }}
          isLoading={requestPlanPaymentOTP?.isPending}
          disabled={
            requestPlanPaymentOTP?.isPending || beneficiaries?.length === 0
          }
        >
          {requestPlanPaymentOTP?.isPending
            ? "Processing..."
            : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentSummary;
