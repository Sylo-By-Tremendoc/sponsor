import * as yup from "yup";
import { validatePhoneNumberWithYup } from "@/utils/validate-phone-number-with-yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import TextInput from "@/components/common/TextInput";
import PhoneInput from "@/components/common/PhoneInput";
import { DateInput } from "@/components/common/DateInput";
import DropdownInput from "@/components/common/DropdownInput";
import { countryData } from "@/utils/constant";
import { Button } from "@/components/common/Button";
import type { BeneficiaryInfo } from "./BeneficiaryInformationCard";
import { useEffect } from "react";

const AddBeneficiaryInformationModal = ({
  selectedBeneficiary,
  openAddBeneficiaryInformationModal,
  setOpenAddBeneficiaryInformationModal,
  handleAdd,
}: {
  selectedBeneficiary: BeneficiaryInfo;
  openAddBeneficiaryInformationModal: boolean;
  setOpenAddBeneficiaryInformationModal: (val: boolean) => void;
  handleAdd: (val: BeneficiaryInfo) => void;
}) => {
  const {
    control,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const newBeneficiary = {
      id: crypto?.randomUUID(),
      state: data.state ?? "",
      email: data.email ?? "",
      country: data.country ?? "",
      address: data.address ?? "",
      fullName: data.fullName ?? "",
      dateOfBirth: data.dateOfBirth ?? "",
      phoneNumber: data.phoneNumber ?? "",
      relationship: data.relationship ?? "",
    };

    handleReset();
    handleAdd(newBeneficiary);
    setOpenAddBeneficiaryInformationModal(false);
  };

  const handleReset = () => {
    reset();

    setValue("state", "");
    setValue("email", "");
    setValue("address", "");
    setValue("country", "");
    setValue("fullName", "");
    setValue("phoneNumber", "");
    setValue("dateOfBirth", "");
    setValue("relationship", "");
  };

  useEffect(() => {
    if (selectedBeneficiary) {
      reset(selectedBeneficiary);
    }
  }, [selectedBeneficiary]);

  return (
    <CustomDialog
      title={selectedBeneficiary ? "Update Beneficiary" : "Add Beneficiary"}
      description="Enter the card details"
      openModal={openAddBeneficiaryInformationModal}
      onClose={() => {
        handleReset();
        setOpenAddBeneficiaryInformationModal(false);
      }}
    >
      <div className="grid grid-cols-2 gap-4 pb-8">
        <div className="md:col-span-2">
          <TextInput
            required
            label="Full Name"
            placeholder="Enter full name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
        </div>

        <TextInput
          required
          label="Relationship"
          placeholder="Enter relationship"
          {...register("relationship")}
          error={errors.relationship?.message}
        />

        <TextInput
          required
          label="Email Address"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email?.message}
        />
        <PhoneInput
          label="Phone Number"
          control={control}
          name="phoneNumber"
          error={errors.phoneNumber?.message}
          required
        />

        <DateInput
          required
          label="Age of Beneficiary"
          placeholder="MM/YY"
          defaultValue={
            selectedBeneficiary?.dateOfBirth
              ? new Date(selectedBeneficiary?.dateOfBirth).toISOString()
              : undefined
          }
          {...register("dateOfBirth", {
            onChange: (e) => setValue("dateOfBirth", e.target.value),
          })}
          onValueChange={(value) => {
            setValue("dateOfBirth", value);
            clearErrors("dateOfBirth");
          }}
          error={errors.dateOfBirth?.message}
        />

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <DropdownInput
              label="Country"
              placeholder="Select Country"
              options={
                countryData?.map((country) => ({
                  label: country.name,
                  value: country.id,
                })) || []
              }
              error={errors.country?.message}
              value={field.value || ""}
              required
              onValueChange={(val) => field.onChange(val)}
            />
          )}
        />

        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <DropdownInput
              label="State"
              placeholder="Select State"
              options={
                countryData?.map((country) => ({
                  label: country.name,
                  value: country.id,
                })) || []
              }
              error={errors.state?.message}
              value={field.value || ""}
              required
              onValueChange={(val) => field.onChange(val)}
            />
          )}
        />
        <div className="md:col-span-2">
          <TextInput
            required
            label="Beneficiary Full Address"
            placeholder="Enter beneficiary full address"
            {...register("address")}
            error={errors.address?.message}
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          variant={"outline"}
          className="md:w-full"
          onClick={() => {
            handleReset();
            setOpenAddBeneficiaryInformationModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="md:w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          {selectedBeneficiary ? "Update" : "Add"} Beneficiary
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default AddBeneficiaryInformationModal;

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name is too short"),

  relationship: yup.string().required("Relationship is required"),

  email: yup
    .string()
    .required("Email address is required")
    .email("Enter a valid email address"),

  phoneNumber: validatePhoneNumberWithYup({ required: true }).required(
    "Phone number is required"
  ),

  dateOfBirth: yup
    .string()
    .required("Age of beneficiary is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format — must be YYYY-MM-DD"),

  country: yup.string().required("Country is required"),

  state: yup.string().required("State is required"),

  address: yup
    .string()
    .required("Full address is required")
    .min(5, "Address is too short"),
});
