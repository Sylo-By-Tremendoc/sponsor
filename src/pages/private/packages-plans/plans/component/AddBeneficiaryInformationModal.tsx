import CustomDialog from "@/components/common/modals/Dialog";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { useEffect, type ReactNode } from "react";

interface AddBeneficiaryInformationModalProps {
  selectedBeneficiary: BeneficiariesParams | null;
  setSelectedBeneficiary: (val: BeneficiariesParams | null) => void;
  openAddBeneficiaryInformationModal: boolean;
  setOpenAddBeneficiaryInformationModal: (val: boolean) => void;
  children?: ReactNode;
  reset: (val: any) => void;
  handleReset: () => void;
}

const AddBeneficiaryInformationModal = ({
  selectedBeneficiary,
  setSelectedBeneficiary,
  openAddBeneficiaryInformationModal,
  setOpenAddBeneficiaryInformationModal,
  children,
  reset,
  handleReset,
}: AddBeneficiaryInformationModalProps) => {
  useEffect(() => {
    if (selectedBeneficiary) {
      reset(selectedBeneficiary);
    }
  }, [selectedBeneficiary]);

  return (
    <CustomDialog
      title={selectedBeneficiary ? "Update Beneficiary" : "Add Beneficiary"}
      openModal={openAddBeneficiaryInformationModal}
      onClose={() => {
        handleReset();
        setSelectedBeneficiary(null);
        setOpenAddBeneficiaryInformationModal(false);
      }}
    >
      {children}
    </CustomDialog>
  );
};

export default AddBeneficiaryInformationModal;
