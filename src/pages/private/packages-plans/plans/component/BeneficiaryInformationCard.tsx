import { FieldLabelText } from "@/components/common/FormHelper";
import Typography from "@/components/common/Typography";
import { HiOutlineTrash } from "react-icons/hi";

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
  onClick,
  handleDelete,
}: {
  beneficiary: BeneficiaryInfo;
  onClick: (val: BeneficiaryInfo) => void;
  handleDelete: (val: BeneficiaryInfo) => void;
}) => {
  const {
    fullName,
    relationship,
    email,
    phoneNumber,
    country,
    state,
    address,
  } = beneficiary;

  return (
    <div
      className="cursor-pointer rounded-xl bg-white shadow-sm p-4 border border-mid-grey hover:shadow-md transition-all duration-200 grid md:grid-cols-3 gap-3"
      onClick={() => onClick(beneficiary)}
    >
      <div className="flex justify-between items-center gap-5 md:col-span-3 pb-2">
        <Typography variant="largeText">{relationship}</Typography>

        <button
          type="button"
          className="bg-feint-grey hover:bg-light-danger rounded-lg p-2 cursor-pointer"
          aria-label={`Delete ${relationship}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(beneficiary);
          }}
        >
          <HiOutlineTrash className="text-danger" />
        </button>
      </div>

      <div>
        <FieldLabelText view label="Full Name" />
        <Typography variant="xSmallTextSemibold" className="mt-1">
          {fullName}
        </Typography>
      </div>

      <div>
        <FieldLabelText view label="Email Address" />
        <Typography
          as="a"
          href={`mailto:${email}`}
          variant="xSmallText"
          className="mt-1 text-primary hover:underline cursor-pointer"
        >
          {email}
        </Typography>
      </div>

      <div>
        <FieldLabelText view label="Phone Number" />
        <Typography variant="xSmallTextSemibold" className="mt-1">
          {phoneNumber}
        </Typography>
      </div>

      <div>
        <FieldLabelText view label="Country" />
        <Typography variant="xSmallTextSemibold" className="mt-1">
          {country}
        </Typography>
      </div>

      <div>
        <FieldLabelText view label="State" />
        <Typography variant="xSmallTextSemibold" className="mt-1">
          {state}
        </Typography>
      </div>

      <div>
        <FieldLabelText view label="Full Address" />
        <Typography
          variant="xSmallTextSemibold"
          className="mt-1 truncate max-w-[250px]"
        >
          {address}
        </Typography>
      </div>
    </div>
  );
};

export default BeneficiaryInformationCard;
