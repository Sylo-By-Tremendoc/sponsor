import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/types/stripe";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { DialogFooter } from "@/components/common/modals/Dialog";
import { Button } from "@/components/common/Button";

export const stripeInputStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#DC2626",
    },
  },
};

export const PaymentForm = ({
  isSubmitting,
  setIsSubmitting,
  onSuccess,
}: {
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
  onSuccess: (id: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    if (setupIntent?.payment_method) {
      onSuccess(setupIntent.payment_method as string);
    }
  };

  return (
    <div className="payment-wrapper">
      <PaymentElement />

      <DialogFooter className="pt-5 flex flex-col gap-2">
        <Button
          className="bg-primary text-white w-full"
          onClick={handleSubmit}
          aria-label="Confirm payment"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Proceeding..." : "Proceed"}
        </Button>
      </DialogFooter>
    </div>
  );
};

export const StripeCardPaymentUI = ({
  clientSecret,
  isSubmitting,
  setIsSubmitting,
  onSuccess,
}: {
  clientSecret: string;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
  onSuccess: (id: string) => void;
}) => {
  return (
    <Elements
      key={clientSecret}
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            fontFamily: "Inter, system-ui, sans-serif",
            fontSizeBase: "14px",
            colorText: "#111827",
            colorPrimary: "#16A34A",
            borderRadius: "8px",
          },
          rules: {
            ".Input": {
              padding: "10px",
              border: "1px solid #D1D5DB",
            },
            ".Input:focus": {
              borderColor: "#16A34A",
            },
          },
        },
      }}
    >
      <PaymentForm
        onSuccess={onSuccess}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </Elements>
  );
};
