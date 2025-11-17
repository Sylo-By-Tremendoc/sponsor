import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import type { BeneficiaryInfo } from "./BeneficiaryInformationCard";

const DeleteBeneficiaryModal = ({
  selectedBeneficiary,
  showDeleteBeneficiaryModal,
  setShowDeleteBeneficiaryModal,
  handleDelete,
}: {
  selectedBeneficiary: BeneficiaryInfo;
  showDeleteBeneficiaryModal: boolean;
  setShowDeleteBeneficiaryModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      title={"Delete Beneficiary"}
      description={`Are you sure you want to delete ${selectedBeneficiary?.fullName} as your beneficiary.`}
      openModal={showDeleteBeneficiaryModal}
      onClose={() => setShowDeleteBeneficiaryModal(false)}
      className="w-100"
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
