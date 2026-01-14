import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import Typography from "@/components/common/Typography";
import DifferentMarketPricing from "@/pages/public/pricing/DifferentMarketPricing";

const SelectPlanDrawer = ({
  isOpen,
  setIsOpen,
  handleSelectPlan,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  handleSelectPlan: (val: string) => void;
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        side="bottom"
        className="rounded-t-2xl w-screen"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Typography
          variant="xxlargeTextBold"
          className="text-center p-5 border-b"
        >
          Select Your Preferred Plan
        </Typography>

        <DifferentMarketPricing
          onClick={(id) => handleSelectPlan(id)}
          className="mt-9"
        />
      </DrawerContent>
    </Drawer>
  );
};

export default SelectPlanDrawer;
