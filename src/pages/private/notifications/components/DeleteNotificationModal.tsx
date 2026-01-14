import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import useDeleteNotification from "../hooks/use-delete-notification";
import type { NotificationParams } from "..";

const DeleteNotificationModal = ({
  selectedNotification,
  openDeleteNotificationModal,
  setOpenDeleteNotificationModal,
  handleDelete,
}: {
  selectedNotification: NotificationParams;
  openDeleteNotificationModal: boolean;
  setOpenDeleteNotificationModal: (val: boolean) => void;
  handleDelete: () => void;
}) => {
  const { deleteNotification } = useDeleteNotification(
    selectedNotification?.id
  );

  return (
    <CustomDialog
      title={"Delete notification"}
      description={`Are you sure you want to delete this notification`}
      openModal={openDeleteNotificationModal}
      onClose={() => setOpenDeleteNotificationModal(false)}
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setOpenDeleteNotificationModal(false)}
        >
          Cancel
        </Button>
        <Button
          isLoading={deleteNotification?.isPending}
          disabled={deleteNotification?.isPending}
          className="bg-danger text-white w-full"
          onClick={() => {
            deleteNotification?.mutate(undefined, {
              onSuccess: () => handleDelete(),
            });
          }}
        >
          {deleteNotification?.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default DeleteNotificationModal;
