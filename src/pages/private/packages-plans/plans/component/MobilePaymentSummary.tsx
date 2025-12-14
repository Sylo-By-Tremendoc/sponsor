import { useState } from "react";
import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import Typography from "@/components/common/Typography";
import PaymentSummary from "./PaymentSummary";
import type { PaymentCardInfo } from "../../components/PaymentCard";
import type { BeneficiaryInfo } from "./BeneficiaryInformationCard";
import { convertPrice } from "@/utils/constant";
import { Button } from "@/components/common/Button";

const MobilePaymentSummaryDrawer = ({
  beneficiaries,
  paymentCardDetails,
  handleMakePayment,
}: {
  beneficiaries: BeneficiaryInfo[];
  paymentCardDetails: PaymentCardInfo;
  handleMakePayment: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden relative w-full">
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex items-end justify-between z-50">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-lg font-semibold">{convertPrice(1.0)}</span>
        </div>

        <Button onClick={() => setIsOpen(true)}>View Details</Button>
      </div>

      {/* Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          side="bottom"
          className="rounded-t-2xl w-screen"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Typography
            variant="xlargeTextSemibold"
            className="text-center p-5 border-b"
          >
            Payment Details
          </Typography>

          <PaymentSummary
            beneficiaries={beneficiaries}
            paymentCardDetails={paymentCardDetails}
            handleMakePayment={handleMakePayment}
            className="border-none"
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobilePaymentSummaryDrawer;
