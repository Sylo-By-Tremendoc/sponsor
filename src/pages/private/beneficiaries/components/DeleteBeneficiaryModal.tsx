import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import type { BeneficiariesParams } from "@/types/beneficiary";
import useDeleteBeneficiary from "../hooks/use-delete-beneficiary";

const DeleteBeneficiaryModal = ({
  beneficiary,
  openDeleteBeneficiaryModal,
  setOpenDeleteBeneficiaryModal,
  handleDelete,
}: {
  beneficiary: BeneficiariesParams;
  openDeleteBeneficiaryModal: boolean;
  setOpenDeleteBeneficiaryModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  const { deleteBeneficiary } = useDeleteBeneficiary(beneficiary?.id);
  return (
    <CustomDialog
      title={"Delete Beneficiary"}
      description={`Are you sure you want to delete ${beneficiary?.first_name} ${beneficiary?.last_name} as your beneficiary`}
      openModal={openDeleteBeneficiaryModal}
      onClose={() => setOpenDeleteBeneficiaryModal(false)}
      className="md:w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setOpenDeleteBeneficiaryModal(false)}
        >
          Cancel
        </Button>
        <Button
          className="bg-danger text-white w-full"
          isLoading={deleteBeneficiary?.isPending}
          disabled={deleteBeneficiary?.isPending}
          onClick={() => {
            deleteBeneficiary.mutate(undefined, {
              onSuccess: () => handleDelete(),
            });
          }}
        >
          {deleteBeneficiary?.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default DeleteBeneficiaryModal;
