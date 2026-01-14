import { DateInput } from "@/components/common/DateInput";
import DropdownInput from "@/components/common/DropdownInput";
import PhoneInput from "@/components/common/PhoneInput";
import TextInput from "@/components/common/TextInput";
import { useBeneficiaryStore } from "@/store/beneficiary-store";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { countryData } from "@/utils/constant";
import {
  Controller,
  type UseFormRegister,
  type FieldErrors,
  type Control,
  type UseFormSetValue,
  type UseFormClearErrors,
} from "react-hook-form";
import type { Country } from "react-phone-number-input";

type BeneficiaryFormValues = {
  fullName: string;
  relationship: string;
  email: string;
  phoneNumber?: string | undefined;
  dateOfBirth?: string;
  country: string;
  state: string;
  address: string;
};

const BeneficiaryForm = ({
  control,
  setValue,
  register,
  clearErrors,
  errors,
  selectedBeneficiary,
}: {
  control: Control<BeneficiaryFormValues>;
  setValue: UseFormSetValue<BeneficiaryFormValues>;
  register: UseFormRegister<BeneficiaryFormValues>;
  clearErrors: UseFormClearErrors<BeneficiaryFormValues>;
  errors: FieldErrors<BeneficiaryFormValues>;
  selectedBeneficiary: BeneficiariesParams;
}) => {
  const location = useBeneficiaryStore((state) => state.location) as Country;

  return (
    <div className="grid md:grid-cols-2 gap-4">
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
        required
        defaultCountry={location}
        error={errors.phoneNumber?.message}
      />

      <DateInput
        required
        label="Date of Birth"
        placeholder="YYYY-MM-DD"
        defaultValue={
          selectedBeneficiary?.date_of_birth
            ? new Date(selectedBeneficiary?.date_of_birth).toISOString()
            : undefined
        }
        {...register("dateOfBirth", {
          onChange: (e) => setValue("dateOfBirth", e.target.value),
        })}
        onValueChange={(val) => {
          setValue("dateOfBirth", val);
          clearErrors("dateOfBirth");
        }}
        error={errors.dateOfBirth?.message}
      />

      <TextInput
        required
        label="Country"
        placeholder="Selected Country"
        {...register("country")}
        error={errors.country?.message}
        disabled
      />

      <Controller
        control={control}
        name="state"
        render={({ field }) => (
          <DropdownInput
            label="State"
            placeholder="Select State"
            required
            options={
              countryData?.map((s) => ({
                label: s.name,
                value: s.id,
              })) || []
            }
            error={errors.state?.message}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      />

      <div className="md:col-span-2">
        <TextInput
          required
          label="Beneficiary Full Address"
          placeholder="Enter full address"
          {...register("address")}
          error={errors.address?.message}
        />
      </div>
    </div>
  );
};

export default BeneficiaryForm;
