import useAxiosBase from "@/hooks/use-axios-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddBeneficiary = () => {
  const { postRequest } = useAxiosBase();
  const queryClient = useQueryClient();

  const addBeneficiary = useMutation({
    mutationKey: ["ADD_BENEFICIARY"],
    mutationFn: (data: FormData) =>
      postRequest("/beneficiaries", data, undefined, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADD_BENEFICIARY"] });
    },
  });

  return addBeneficiary;
};

export default useAddBeneficiary;
