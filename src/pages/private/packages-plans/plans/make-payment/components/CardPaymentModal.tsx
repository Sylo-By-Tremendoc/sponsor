import CustomDialog from "@/components/common/modals/Dialog";
import { StripeCardPaymentUI } from "./StripeCardPaymentUI";

const CardPaymentModal = ({
  isSubmitting,
  clientSecret,
  setIsSubmitting,
  showCardPaymentModal,
  setShowCardPaymentModal,
  onSuccess,
}: {
  clientSecret: string;
  isSubmitting: boolean;
  setIsSubmitting: (val: boolean) => void;
  showCardPaymentModal: boolean;
  setShowCardPaymentModal: (val: boolean) => void;
  onSuccess: (id: string) => void;
}) => {
  return (
    <CustomDialog
      title="Card Payment"
      description="Enter your card details below to complete the payment."
      openModal={showCardPaymentModal}
      onClose={() => setShowCardPaymentModal(false)}
    >
      <StripeCardPaymentUI
        clientSecret={clientSecret}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        onSuccess={onSuccess}
      />
    </CustomDialog>
  );
};

export default CardPaymentModal;
