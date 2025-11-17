import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import TextInput from "@/components/common/TextInput";
import NumberInput from "@/components/common/NumberInput";
import { DateInput } from "@/components/common/DateInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/common/Button";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import Typography from "@/components/common/Typography";

const AddCardModal = ({
  openAddCardDetails,
  setOpenAddCardDetails,
  setPaymentCardDetails,
}: {
  openAddCardDetails: boolean;
  setOpenAddCardDetails: (val: boolean) => void;
  setPaymentCardDetails: (val: any) => void;
}) => {
  const {
    watch,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const saveCard = watch("saveCard");

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    setPaymentCardDetails({
      id: "1",
      cardHolderName: data?.cardHolderName,
      cardNumber: data?.cardNumber,
      expiryDate: data?.expiryDate,
      cvc: data?.cvc,
      saveCard: data?.saveCard ?? false,
    });

    handleReset();
    setOpenAddCardDetails(false);
  };

  const handleReset = () => {
    reset();
    setValue("cardHolderName", "");
    setValue("cardNumber", "");
    setValue("expiryDate", "");
    setValue("cvc", "");
    setValue("transactionPin", "");
    setValue("saveCard", false);
  };

  return (
    <CustomDialog
      title={"Add Card"}
      description="Enter the card details"
      openModal={openAddCardDetails}
      onClose={() => {
        handleReset();
        setOpenAddCardDetails(false);
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextInput
            required
            label="Card Number"
            placeholder="Enter card number"
            {...register("cardNumber")}
            error={errors.cardNumber?.message}
          />
        </div>
        <TextInput
          required
          label="Card Holder's Name"
          placeholder="Enter card holder's name"
          {...register("cardHolderName")}
          error={errors.cardHolderName?.message}
        />
        <DateInput
          required
          label="Expiry Date"
          placeholder="MM/YY"
          // defaultValue={
          //   house?.completionDate
          //     ? new Date(house?.completionDate).toISOString()
          //     : undefined
          // // }
          {...register("expiryDate", {
            onChange: (e) => setValue("expiryDate", e.target.value),
          })}
          onValueChange={(value) => {
            setValue("expiryDate", value);
            clearErrors("expiryDate");
          }}
          error={errors.expiryDate?.message}
        />
        <NumberInput
          required
          label="CVC"
          placeholder="123"
          {...register("cvc")}
          error={errors.cvc?.message}
        />
        <TextInput
          required
          type="password"
          label="Transaction PIN"
          placeholder="Enter transaction pin"
          {...register("transactionPin")}
          error={errors.transactionPin?.message}
        />

        <label className="flex items-center gap-2 mt-2 col-span-2">
          <CheckBoxInput
            checked={saveCard}
            onChange={(val) => setValue("saveCard", val)}
          />

          <Typography variant={"xSmallText"} className="text-charcoal-gray">
            Save card for monthly/yearly charges
          </Typography>
        </label>
      </div>

      <DialogFooter className="mt-5">
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Add Card
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default AddCardModal;

export const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),

  cardHolderName: yup
    .string()
    .required("Card holder's name is required")
    .min(3, "Name is too short"),

  expiryDate: yup.string().required("Expiry date is required"),

  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits"),

  transactionPin: yup
    .string()
    .required("Transaction PIN is required")
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits"),

  saveCard: yup.boolean().optional(),
});
