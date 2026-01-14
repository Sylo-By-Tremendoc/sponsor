import CustomDialog from "@/components/common/modals/Dialog";
import type { SubscriptionPlan } from "@/types/plans";
import { SubscriptionDetailsCard } from "./SubscriptionDetailsCard";
import Typography from "@/components/common/Typography";
import { FieldLabelText } from "@/components/common/FormHelper";
import { useMemo } from "react";
import {
  formatDateOfBirth,
  formatGender,
  formatPhoneNumber,
} from "@/utils/formatters";

const ViewSubscriptionDetailsModal = ({
  details,
  openViewSubscriptionDetailsModal,
  setOpenViewSubscriptionDetailsModal,
}: {
  details: SubscriptionPlan;
  openViewSubscriptionDetailsModal: boolean;
  setOpenViewSubscriptionDetailsModal: (val: boolean) => void;
}) => {
  const personalInformation = useMemo(
    () => [
      { label: "First Name", value: details?.beneficiary?.first_name || "—" },
      { label: "Last Name", value: details?.beneficiary?.last_name || "—" },
      { label: "Gender", value: formatGender(details?.beneficiary?.gender) },
      {
        label: "Date of Birth",
        value: formatDateOfBirth(details?.beneficiary?.date_of_birth),
      },
      {
        label: "Phone Number",
        value: formatPhoneNumber(details?.beneficiary?.phone),
      },
      { label: "Email Address", value: details?.beneficiary?.email || "—" },
      { label: "Address", value: details?.beneficiary?.address || "—" },
    ],
    [details]
  );

  return (
    <CustomDialog
      title={"Subscription Information"}
      openModal={openViewSubscriptionDetailsModal}
      onClose={() => setOpenViewSubscriptionDetailsModal(false)}
      className="md:max-w-[60%]"
    >
        <div className="space-y-5">
      <SubscriptionDetailsCard plan={details?.plan} />

      <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-mid-grey space-y-2">
        <Typography variant={"mediumTextBold"}>Personal Information</Typography>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 items-center">
          {personalInformation?.map((item, index) => (
            <div key={index} className="space-y-1">
              <FieldLabelText view label={item?.label} />

              {item.label === "Email" ? (
                <Typography
                  as="a"
                  variant="smallText"
                  href={`mailto:${item.value}`}
                  className="text-primary font-medium underline truncate"
                >
                  {item.value}
                </Typography>
              ) : (
                <Typography
                  variant="smallText"
                  className="font-medium truncate"
                >
                  {item.value}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </CustomDialog>
  );
};

export default ViewSubscriptionDetailsModal;
