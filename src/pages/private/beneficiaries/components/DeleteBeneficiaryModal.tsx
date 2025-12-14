import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";

const DeleteBeneficiaryModal = ({
  beneficiary,
  openDeleteBeneficiaryModal,
  setOpenDeleteBeneficiaryModal,
  handleDelete,
}: {
  beneficiary: any;
  openDeleteBeneficiaryModal: boolean;
  setOpenDeleteBeneficiaryModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      title={"Delete Beneficiary"}
      description={`Are you sure you want to delete ${beneficiary?.firstName} ${beneficiary?.lastName} as your beneficiary`}
      openModal={openDeleteBeneficiaryModal}
      onClose={() => setOpenDeleteBeneficiaryModal(false)}
      className="w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setOpenDeleteBeneficiaryModal(false)}
        >
          Cancel
        </Button>
        <Button className="bg-danger text-white w-full" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default DeleteBeneficiaryModal;
