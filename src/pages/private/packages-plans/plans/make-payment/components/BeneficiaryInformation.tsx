import { HiOutlinePlus } from "react-icons/hi";
import SelectBeneficiaryDrawer from "./SelectBeneficiaryDrawer";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { Button } from "@/components/common/Button";
import BeneficiaryInformationCard from "../../component/BeneficiaryInformationCard";
import { useMemo } from "react";

const BeneficiaryInformation = ({
  beneficiaries,
  setBeneficiaries,
  showSelectBeneficiaryDrawer,
  setShowSelectBeneficiaryDrawer,
  onSelect,
  handleDelete,
}: {
  beneficiaries: BeneficiariesParams[];
  showSelectBeneficiaryDrawer: boolean;
  setBeneficiaries: (val: any) => void;
  setShowSelectBeneficiaryDrawer: (val: boolean) => void;
  onSelect: (val: string) => void;
  handleDelete?: (val: BeneficiariesParams) => void;
}) => {
  const addedBeneficiaries = useMemo(
    () => beneficiaries?.filter((beneficiary) => beneficiary.isSelected) || [],
    [beneficiaries]
  );

  return (
    <div>
      {addedBeneficiaries.length > 0 && (
        <div className="space-y-3">
          {addedBeneficiaries.map((b, idx) => (
            <BeneficiaryInformationCard
              key={idx}
              beneficiary={b}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 mt-5"
        onClick={() => setShowSelectBeneficiaryDrawer(true)}
      >
        Add Beneficiary
        <HiOutlinePlus />
      </Button>

      <SelectBeneficiaryDrawer
        beneficiaries={beneficiaries}
        setBeneficiaries={setBeneficiaries}
        showSelectBeneficiaryDrawer={showSelectBeneficiaryDrawer}
        setShowSelectBeneficiaryDrawer={setShowSelectBeneficiaryDrawer}
        onSelect={onSelect}
      />
    </div>
  );
};

export default BeneficiaryInformation;
