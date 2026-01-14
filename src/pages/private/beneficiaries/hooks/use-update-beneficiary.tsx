import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateBeneficiary = (id: string) => {
  const { putRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const updateBeneficiary = useMutation({
    mutationKey: ["UPDATE_BENEFICIARY", id],
    mutationFn: (data: FormData) => putRequest(`/beneficiaries/${id}`, data, undefined, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UPDATE_BENEFICIARY"] });
    },
  });

  return updateBeneficiary;
};

export default useUpdateBeneficiary;
