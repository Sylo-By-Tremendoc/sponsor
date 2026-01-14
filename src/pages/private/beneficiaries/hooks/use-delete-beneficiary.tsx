import { useMutation } from "@tanstack/react-query";
import useAxiosBase from "@/hooks/use-axios-base";
import { toast } from "react-toastify";

const useDeleteBeneficiary = (id: string) => {
  const { deleteRequest } = useAxiosBase();

  const deleteBeneficiary = useMutation({
    mutationKey: ["DELETE_AGENT", id],
    mutationFn: () => deleteRequest(`/beneficiaries/${id}`),
    onSuccess: () => {
      toast.success("Beneficiary deleted successfully");
    },
    onError: () => {
      toast.error("Unable to delete the beneficiary. Please try again.");
    },
  });

  return { deleteBeneficiary };
};

export default useDeleteBeneficiary;
