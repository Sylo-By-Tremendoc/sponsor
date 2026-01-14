import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import type { SubscriptionPlan } from "@/types/plans";

const DeleteSubscriptionModal = ({
  selectedSubscription,
  openDeleteSubscriptionModal,
  setOpenDeleteSubscriptionModal,
  handleDelete,
}: {
  selectedSubscription: SubscriptionPlan;
  openDeleteSubscriptionModal: boolean;
  setOpenDeleteSubscriptionModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  return (
    <CustomDialog
      title={"Delete Subscription"}
      description={`Are you sure you want to delete this Subscription ${selectedSubscription?.plan?.name}?`}
      openModal={openDeleteSubscriptionModal}
      onClose={() => setOpenDeleteSubscriptionModal(false)}
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setOpenDeleteSubscriptionModal(false)}
        >
          Cancel
        </Button>
        <Button className="bg-danger text-white w-full" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default DeleteSubscriptionModal;
