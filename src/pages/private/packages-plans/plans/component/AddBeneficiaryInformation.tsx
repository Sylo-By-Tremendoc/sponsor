import Typography from "@/components/common/Typography";
import { Button } from "@/components/common/Button";
import { HiOutlinePlus } from "react-icons/hi";
import type { BeneficiaryInfo } from "./BeneficiaryInformationCard";
import BeneficiaryInformationCard from "./BeneficiaryInformationCard";

const AddBeneficiaryInformation = ({
  beneficiaries,
  onClick,
  handleAdd,
  handleDelete,
}: {
  beneficiaries: BeneficiaryInfo[];
  onClick: (val: BeneficiaryInfo) => void;
  handleAdd: () => void;
  handleDelete: (val: BeneficiaryInfo) => void;
}) => {
  

  return (
    <section className="space-y-4">
      {beneficiaries?.length > 0 && (
        <div className="space-y-3 bg-white border border-mid-grey rounded-2xl p-5">
          <Typography variant={"largeText"}>Beneficiary Information</Typography>

          <div className="grid  gap-4">
            {beneficiaries?.map((b) => (
              <BeneficiaryInformationCard
                key={b.id}
                beneficiary={b}
                onClick={onClick}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      <Button
        // variant={"outline"}
        className="w-full text-white"
        onClick={handleAdd}
      >
        Add {beneficiaries?.length > 0 && "Another"} Beneficiary{" "}
        <HiOutlinePlus className="text-white" />
      </Button>
    </section>
  );
};

export default AddBeneficiaryInformation;
