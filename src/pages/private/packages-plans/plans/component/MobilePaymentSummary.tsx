import { useState } from "react";
import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import Typography from "@/components/common/Typography";
import PaymentSummary from "./PaymentSummary";
import { convertPrice } from "@/utils/constant";
import { Button } from "@/components/common/Button";
import type { BeneficiariesParams } from "@/types/beneficiary";
import type { PlansParam } from "@/types/plans";
import { useCurrencyStore } from "@/store/currency-store";

const MobilePaymentSummaryDrawer = ({
  plan,
  isLoading,
  beneficiaries,
  onSuccess,
}: {
  isLoading: boolean;
  plan: PlansParam;
  beneficiaries: BeneficiariesParams[];
  onSuccess: () => void;
}) => {
  const currency = useCurrencyStore((state) => state?.currency);

  const price = Number(plan?.price || 0);
  const serviceCharge = price * 0.05;
  const totalPrice = price + serviceCharge;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden relative w-full">
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex items-end justify-between z-50">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-lg font-semibold">
            {convertPrice(totalPrice, currency)}
          </span>
        </div>

        <Button onClick={() => setIsOpen(true)}>View Details</Button>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          side="bottom"
          className="rounded-t-2xl w-screen"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Typography variant="xlargeTextSemibold" className="p-5 border-b">
            Payment Summary
          </Typography>

          <PaymentSummary
            beneficiaries={beneficiaries}
            isLoading={isLoading}
            plan={plan}
            onSuccess={() => {
              onSuccess();
              setIsOpen(false);
            }}
            showHeader={false}
            className="flex-1 overflow-y-auto border-none"
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobilePaymentSummaryDrawer;
