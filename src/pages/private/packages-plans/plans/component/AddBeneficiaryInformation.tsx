import Typography from "@/components/common/Typography";
import { Button } from "@/components/common/Button";
import type { BeneficiaryInfo } from "./BeneficiaryInformationCard";
import BeneficiaryInformationCard from "./BeneficiaryInformationCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  validateAgeRangeWithYup,
  validatePhoneNumberWithYup,
} from "@/utils/validate-phone-number-with-yup";
import { HiOutlinePlus } from "react-icons/hi";
import BeneficiaryForm from "./BeneficiaryForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/Popover";
import { useBeneficiaryStore } from "@/store/beneficiary-store";
import { beneficiaryCountries } from "@/utils/constant";
import { DialogFooter } from "@/components/common/modals/Dialog";
import AddBeneficiaryInformationModal from "./AddBeneficiaryInformationModal";
import { useEffect } from "react";

const AddBeneficiaryInformation = ({
  beneficiaries,
  handleAdd,
  handleEdit,
  handleDelete,
  selectedBeneficiary,
  setSelectedBeneficiary,
  openAddBeneficiaryInformationModal,
  setOpenAddBeneficiaryInformationModal,
}: {
  beneficiaries: BeneficiaryInfo[];
  selectedBeneficiary: BeneficiaryInfo;
  setSelectedBeneficiary: (val: BeneficiaryInfo | null) => void;
  openAddBeneficiaryInformationModal: boolean;
  setOpenAddBeneficiaryInformationModal: (val: boolean) => void;
  handleAdd: (val: BeneficiaryInfo) => void;
  handleEdit: (val: BeneficiaryInfo) => void;
  handleDelete: (val: BeneficiaryInfo) => void;
}) => {
  const location = useBeneficiaryStore((state) => state.location);
  const ageRange = useBeneficiaryStore((state) => state.ageRange);
  const [minAge, maxAge] = ageRange.split("-").map(Number);

  const selectedCountry = beneficiaryCountries.find((c) => c.id === location);

  const schema = yup.object().shape({
    fullName: yup.string().required().min(3),
    relationship: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: validatePhoneNumberWithYup({ required: true }),
    dateOfBirth: validateAgeRangeWithYup({
      minAge,
      maxAge,
      outOfRangeMessage: `Age must be between ${minAge} and ${maxAge}`,
    }),
    country: yup.string().required(),
    state: yup.string().required(),
    address: yup.string().required().min(5),
  });

  const {
    control,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: selectedCountry?.label ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    handleAdd(data);
    handleReset();

    setOpenAddBeneficiaryInformationModal(false);
  };

  const handleReset = () => {
    setValue("fullName", "");
    setValue("relationship", "");
    setValue("email", "");
    setValue("phoneNumber", "");
    setValue("dateOfBirth", "");
    setValue("state", "");
    setValue("address", "");

    clearErrors();
  };

  useEffect(() => {
    if (selectedCountry) {
      setValue("country", selectedCountry.label);
    }
  }, [selectedCountry, setValue]);

  return (
    <section className="space-y-6">
      {beneficiaries.length > 0 ? (
        <div className="space-y-3">
          <Typography variant="smallTextSemibold">
            Added Beneficiaries
          </Typography>

          <div className="space-y-3">
            {beneficiaries.map((b, idx) => (
              <BeneficiaryInformationCard
                key={idx}
                beneficiary={b}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <BeneficiaryForm
          control={control}
          setValue={setValue}
          register={register}
          clearErrors={clearErrors}
          errors={errors}
          selectedBeneficiary={selectedBeneficiary!}
        />
      )}

      {beneficiaries?.length === 0 && (
        <Button
          type="submit"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSubmit(onSubmit)}
        >
          Add Beneficiary
          <HiOutlinePlus />
        </Button>
      )}

      <AddBeneficiaryInformationModal
        selectedBeneficiary={selectedBeneficiary!}
        setSelectedBeneficiary={setSelectedBeneficiary}
        openAddBeneficiaryInformationModal={openAddBeneficiaryInformationModal}
        setOpenAddBeneficiaryInformationModal={
          setOpenAddBeneficiaryInformationModal
        }
        reset={reset}
        handleReset={handleReset}
      >
        <BeneficiaryForm
          control={control}
          setValue={setValue}
          register={register}
          clearErrors={clearErrors}
          errors={errors}
          selectedBeneficiary={selectedBeneficiary!}
        />

        <DialogFooter className="mt-5">
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
      </AddBeneficiaryInformationModal>
    </section>
  );
};

export default AddBeneficiaryInformation;

export const AddBeneficiaryPopover = ({
  onUseExisting,
  onAddNew,
}: {
  onUseExisting: () => void;
  onAddNew: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          Add Another Beneficiary
          <HiOutlinePlus />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        className="w-[var(--radix-popover-trigger-width)] p-0 border rounded-xl shadow-lg overflow-hidden"
      >
        <div className="flex flex-col">
          <div
            className="p-4 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
            onClick={onUseExisting}
          >
            <Typography variant={"smallText"}>
              Use Existing Details{" "}
              <span className="text-[11px] text-charcoal-gray pl-1">
                (Location, Age Range and Plan)
              </span>
            </Typography>
            <input type="checkbox" className="h-3 w-3 pointer-events-none" />
          </div>

          <div className="h-px bg-gray-200 w-full" />

          <div
            className="p-4 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
            onClick={onAddNew}
          >
            <Typography variant={"smallText"}>
              Enter New Details{" "}
              <span className="text-[11px] text-charcoal-gray pl-1">
                (Location, Age Range and Plan)
              </span>
            </Typography>
            <input type="checkbox" className="h-3 w-3 pointer-events-none" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
