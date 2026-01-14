import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";

const DeleteCardModal = ({
  openDeleteCardModal,
  setOpenDeleteCardModal,
  handleDelete,
}: {
  openDeleteCardModal: boolean;
  setOpenDeleteCardModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      title={"Delete Card"}
      description="Are you sure you want to delete this card details"
      openModal={openDeleteCardModal}
      onClose={() => setOpenDeleteCardModal(false)}
      className="md:w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setOpenDeleteCardModal(false)}
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

export default DeleteCardModal;
