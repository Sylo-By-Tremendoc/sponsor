import Typography from "@/components/common/Typography";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { defaultImages } from "@/utils/constant";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

const BeneficiaryInformationCard = ({
  beneficiary,
  handleEdit,
  handleDelete,
}: {
  beneficiary: BeneficiariesParams;
  handleEdit?: (val: BeneficiariesParams) => void;
  handleDelete?: (val: BeneficiariesParams) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 border rounded-xl p-4 bg-white hover:shadow-sm transition">
      {/* Left section */}
      <div className="flex items-center gap-4 min-w-0">
        <img
          src={defaultImages.avatar}
          alt={`${beneficiary.first_name} profile`}
          className="w-12 h-12 rounded-full border object-cover"
        />

        <div className="min-w-0">
          <Typography variant="mediumTextBold" className="truncate">
            {beneficiary.first_name} {beneficiary.last_name}
          </Typography>

          {beneficiary.relationship && (
            <Typography
              variant="xSmallText"
              className="text-charcoal-gray"
            >
              {beneficiary.relationship}
            </Typography>
          )}

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-1">
            {beneficiary.email && (
              <a
                href={`mailto:${beneficiary.email}`}
                className="flex items-center gap-1 text-primary hover:underline text-xs truncate"
              >
                <HiOutlineMail className="w-4 h-4" />
                <span className="truncate max-w-[140px]">
                  {beneficiary.email}
                </span>
              </a>
            )}

            {beneficiary.phone && (
              <a
                href={`tel:${beneficiary.phone}`}
                className="flex items-center gap-1 text-charcoal-gray text-xs"
              >
                <HiOutlinePhone className="w-4 h-4" />
                <span>{beneficiary.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {handleEdit && (
          <button
            type="button"
            className="p-2 rounded-lg bg-feint-grey hover:bg-mid-grey transition"
            aria-label={`Edit ${beneficiary.first_name}`}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(beneficiary);
            }}
          >
            <HiOutlinePencil />
          </button>
        )}

        {handleDelete && (
          <button
            type="button"
            className="p-2 rounded-lg bg-feint-grey hover:bg-light-danger transition"
            aria-label={`Delete ${beneficiary.first_name}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(beneficiary);
            }}
          >
            <HiOutlineTrash className="text-danger" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryInformationCard;
