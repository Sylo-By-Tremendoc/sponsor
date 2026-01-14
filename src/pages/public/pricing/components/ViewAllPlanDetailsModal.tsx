import { Button } from "@/components/common/Button";
import Icons from "@/components/common/Icons";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import Typography from "@/components/common/Typography";
import { useCurrencyStore } from "@/store/currency-store";
import type { PlansParam } from "@/types/plans";
import { convertPrice, convertToTitleCase, displayAgeRange } from "@/utils/constant";
import { FiUser } from "react-icons/fi";

const ViewAllPlanDetailsModal = ({
  plan,
  openViewAllPlanDetailsModal,
  setOpenViewAllPlanDetailsModal,
  onBuy,
}: {
  plan: PlansParam;
  openViewAllPlanDetailsModal: boolean;
  setOpenViewAllPlanDetailsModal: (val: boolean) => void;
  onBuy: (id: string) => void;
}) => {
  const currency = useCurrencyStore((state) => state?.currency);

  return (
    <CustomDialog
      title={plan?.name}
      description={plan?.description}
      openModal={openViewAllPlanDetailsModal}
      onClose={() => setOpenViewAllPlanDetailsModal(false)}
      className="md:w-100"
    >
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <Typography variant="xxlargeTextBold" className="text-[#2BAC0B]">
              {convertPrice(Number(plan.price), currency)}
            </Typography>
            <Typography variant="smallText" className="text-gray-500">
              / {convertToTitleCase(plan.billing_interval)}
            </Typography>
          </div>
          <div
            className="
          flex items-center justify-between
          gap-2 h-8
          rounded-lg border border-gray-300
          bg-white hover:bg-gray-50
          px-3 text-sm font-medium text-gray-800
          transition-colors
        "
          >
            <span className="flex items-center gap-2">
              <FiUser className="text-gray-700 w-4 h-4" />

              <Typography variant="xSmallText">
                {displayAgeRange(plan.age_range_min, plan.age_range_max)}
              </Typography>
            </span>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <Typography variant="smallTextSemibold">Covered Benefits</Typography>

          <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
            {plan.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Icons iconName="check" className="w-4 h-4 text-[#2BAC0B]" />
                <Typography variant="xSmallText" className="text-charcoal-gray">
                  {benefit.benefit_name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter className="pt-6">
        <Button
          className="w-full bg-[#2BAC0B] hover:bg-[#249009] text-white"
          onClick={() => onBuy(plan.id)}
        >
          Buy Package
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default ViewAllPlanDetailsModal;
