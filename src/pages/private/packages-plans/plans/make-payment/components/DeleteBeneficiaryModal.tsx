import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import type { BeneficiariesParams } from "@/types/beneficiary";

const RemoveBeneficiaryModal = ({
  selectedBeneficiary,
  setSelectedBeneficiary,
  showRemoveBeneficiaryModal,
  setShowRemoveBeneficiaryModal,
  handleRemove,
}: {
  selectedBeneficiary: BeneficiariesParams;
  showRemoveBeneficiaryModal: boolean;
  setShowRemoveBeneficiaryModal: (val: boolean) => void;
  setSelectedBeneficiary: (val: BeneficiariesParams | null) => void;
  handleRemove: (id: string) => void;
}) => {
  return (
    <CustomDialog
      title={"Remove Beneficiary"}
      description={`Are you sure you want to remove ${selectedBeneficiary?.first_name} ${selectedBeneficiary?.last_name} as your beneficiary.`}
      openModal={showRemoveBeneficiaryModal}
      onClose={() => {
        setSelectedBeneficiary(null);
        setShowRemoveBeneficiaryModal(false);
      }}
      className="md:w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setShowRemoveBeneficiaryModal(false)}
          aria-label="Cancel remove"
        >
          Cancel
        </Button>

        <Button
          className="bg-danger text-white w-full"
          onClick={() => handleRemove(selectedBeneficiary?.id)}
          aria-label="Confirm remove"
        >
          Yes, Remove
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default RemoveBeneficiaryModal;
