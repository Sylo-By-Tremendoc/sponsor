import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import type { BeneficiariesParams } from "@/types/beneficiary";

const DeleteBeneficiaryModal = ({
  selectedBeneficiary,
  setSelectedBeneficiary,
  showDeleteBeneficiaryModal,
  setShowDeleteBeneficiaryModal,
  handleDelete,
}: {
  selectedBeneficiary: BeneficiariesParams;
  showDeleteBeneficiaryModal: boolean;
  setShowDeleteBeneficiaryModal: (val: boolean) => void;
  setSelectedBeneficiary: (val: BeneficiariesParams | null) => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      title={"Delete Beneficiary"}
      description={`Are you sure you want to delete ${selectedBeneficiary?.first_name} ${selectedBeneficiary?.last_name} as your beneficiary.`}
      openModal={showDeleteBeneficiaryModal}
      onClose={() => {
        setSelectedBeneficiary(null);
        setShowDeleteBeneficiaryModal(false);
      }}
      className="md:w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setShowDeleteBeneficiaryModal(false)}
          aria-label="Cancel logout"
        >
          Cancel
        </Button>

        <Button
          className="bg-danger text-white w-full"
          onClick={handleDelete}
          aria-label="Confirm logout"
        >
          Yes, Delete
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default DeleteBeneficiaryModal;
