import { useMutation } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import { toast } from "react-toastify";

const useDeleteNotification = (id: string) => {
  const { deleteRequest } = useAxiosBase();

  const deleteNotification = useMutation({
    mutationKey: ["DELETE_NOTIFICATION", id],
    mutationFn: () => deleteRequest(`/notifications/${id}`),
    onSuccess: () => {
      toast.success("Notification deleted successfully");
    },
    onError: () => {
      toast.error("Unable to delete the notification. Please try again.");
    },
  });

  return { deleteNotification };
};

export default useDeleteNotification;
