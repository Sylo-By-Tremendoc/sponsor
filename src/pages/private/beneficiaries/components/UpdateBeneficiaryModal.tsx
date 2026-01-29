import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import TextInput from "@/components/common/TextInput";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import ImageUpload from "@/components/common/UploadImage";
import PhoneInput from "@/components/common/PhoneInput";
import DropdownInput from "@/components/common/DropdownInput";
import { useBeneficiaryStore } from "@/store/beneficiary-store";
import type { Country } from "react-phone-number-input";
import { useEffect } from "react";
import { beneficiaryCountries } from "@/utils/constant";
import {
  validatePhoneNumberWithYup,
} from "@/utils/validate-phone-number-with-yup";
import type { BeneficiariesParams } from "@/types/beneficiary";
import useUpdateBeneficiary from "../hooks/use-update-beneficiary";

const UpdateBeneficiaryModal = ({
  beneficiary,
  openUpdateBeneficiaryModal,
  setOpenUpdateBeneficiaryModal,
  onSuccess,
}: {
  beneficiary: BeneficiariesParams;
  openUpdateBeneficiaryModal: boolean;
  setOpenUpdateBeneficiaryModal: (val: boolean) => void;
  onSuccess: () => void;
}) => {
  const updateBeneficiary = useUpdateBeneficiary(beneficiary?.id);

  const location = useBeneficiaryStore((state) => state.location) as Country;

  const selectedCountry = beneficiaryCountries.find((c) => c.id === location);

  const schema = yup.object({
    first_name: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters"),
    last_name: yup
      .string()
      .required("Lat name is required")
      .min(3, "Last name must be at least 3 characters"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    phone: validatePhoneNumberWithYup({ required: true }),
    gender: yup.string().required("Gender is required"),
    relationship: yup.string().required("Relationship is required"),
    address: yup.string().required("Address is required"),
    profile_picture: yup.mixed().nullable(),
  });

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const formData = new FormData();

    // File upload
    if (data.profile_picture instanceof File) {
      formData.append("profile_picture", data.profile_picture);
    }

    // Text fields
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    formData.append("gender", data.gender);
    formData.append("relationship", data.relationship);
    formData.append("address", data.address);

    updateBeneficiary?.mutate(formData, {
      onSuccess: () => {
        toast.success("Beneficiary successfully added");
        onSuccess();
        handleReset();
      },
      onError: (error: any) => {
        toast.error(
          error?.message || "Failed to add beneficiary. Please try again."
        );
      },
    });
  };

  const handleReset = () => {
    reset({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      relationship: "",
      gender: "",
      address: "",
      profile_picture: null,
    });
  };

  useEffect(() => {
    reset({
      first_name: beneficiary?.first_name || "",
      last_name: beneficiary?.last_name || "",
      email: beneficiary?.email || "",
      phone: beneficiary?.phone || "",
      relationship: beneficiary?.relationship || "",
      gender: beneficiary?.gender || "",
      address: beneficiary?.address || "",
      profile_picture: beneficiary?.profile_picture?.url || null,
    });
  }, [selectedCountry, setValue]);

  return (
    <CustomDialog
      title="Update Beneficiary Information"
      description="Fill in the details below to update the beneficiary information."
      openModal={openUpdateBeneficiaryModal}
      onClose={() => setOpenUpdateBeneficiaryModal(false)}
      className="md:max-w-[50%]"
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-5"
      >
        <Controller
          control={control}
          name="profile_picture"
          render={({ field }) => (
            <ImageUpload
              label="Profile Picture"
              value={field.value as File | null}
              onChange={field.onChange}
              error={errors.profile_picture?.message}
              className="md:col-span-2"
            />
          )}
        />

        <TextInput
          required
          label="First Name"
          placeholder="Enter first name"
          {...register("first_name")}
          error={errors.first_name?.message}
        />

        <TextInput
          required
          label="Last Name"
          placeholder="Enter last name"
          {...register("last_name")}
          error={errors.last_name?.message}
        />

        <TextInput
          required
          label="Email"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email?.message}
          disabled
        />

        <PhoneInput
          label="Phone Number"
          control={control}
          name="phone"
          required
          defaultCountry={location}
          error={errors.phone?.message}
        />

        {/* <TextInput
          required
          label="Country"
          placeholder="Selected Country"
          {...register("country")}
          error={errors.country?.message}
          disabled
        />

        <DateInput
          required
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          disabled
          defaultValue={
            beneficiary?.date_of_birth
              ? new Date(beneficiary?.date_of_birth).toISOString()
              : undefined
          }
          {...register("date_of_birth", {
            onChange: (e) => setValue("date_of_birth", e.target.value),
          })}
          onValueChange={(value) => {
            setValue("date_of_birth", value);
            clearErrors("date_of_birth");
          }}
          error={errors.date_of_birth?.message}
        /> */}

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <DropdownInput
              required
              label="Gender"
              placeholder="Select"
              value={field.value}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              error={errors.gender?.message}
              onValueChange={field.onChange}
            />
          )}
        />

        <TextInput
          required
          label="Relationship"
          placeholder="Enter relationship"
          {...register("relationship")}
          error={errors.relationship?.message}
        />

        <div className="md:col-span-2">
          <TextInput
            required
            label="Address"
            placeholder="Enter residential address"
            {...register("address")}
            error={errors.address?.message}
          />
        </div>

        <DialogFooter className="md:col-span-2 pt-5">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setOpenUpdateBeneficiaryModal(false)}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={updateBeneficiary.isPending}
            disabled={updateBeneficiary.isPending}
            className="w-full"
          >
            {updateBeneficiary.isPending ? "Updating..." : "Update Beneficiary"}
          </Button>
        </DialogFooter>
      </form>
    </CustomDialog>
  );
};

export default UpdateBeneficiaryModal;
