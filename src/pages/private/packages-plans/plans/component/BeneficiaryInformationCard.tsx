import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export type BeneficiaryInfo = {
  id: string;
  fullName: string;
  relationship: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  address: string;
  dateOfBirth?: string;
};

const BeneficiaryInformationCard = ({
  beneficiary,
  handleEdit,
  handleDelete,
}: {
  beneficiary: BeneficiaryInfo;
  handleEdit: (val: BeneficiaryInfo) => void;
  handleDelete: (val: BeneficiaryInfo) => void;
}) => {
  return (
    <div className="flex justify-between items-center border rounded-lg p-3 bg-gray-50">
      <div>
        <p className="font-semibold">{beneficiary?.fullName}</p>
        <p className="text-xs text-gray-600">
          {beneficiary?.relationship} — {beneficiary?.email}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="bg-feint-grey hover:bg-mid-grey rounded-lg p-2 cursor-pointer"
          aria-label={`Edit ${beneficiary}`}
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(beneficiary);
          }}
        >
          <HiOutlinePencil className="text" />
        </button>

        <button
          type="button"
          className="bg-feint-grey hover:bg-light-danger rounded-lg p-2 cursor-pointer"
          aria-label={`Delete ${beneficiary}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(beneficiary);
          }}
        >
          <HiOutlineTrash className="text-danger" />
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryInformationCard;
