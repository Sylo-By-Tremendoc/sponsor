import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import TextInput from "@/components/common/TextInput";
import NumberInput from "@/components/common/NumberInput";
import { DateInput } from "@/components/common/DateInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/common/Button";

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
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    console.log("Card Data Submitted:", data);
    setPaymentCardDetails({
      id: "1",
      cardHolderName: data?.cardHolderName,
      cardNumber: data?.cardNumber,
      expiryDate: data?.expiryDate,
      cvc: data?.cvc,
    });

    reset();
    setValue("cardHolderName", "");
    setValue("cardNumber", "");
    setValue("expiryDate", "");
    setValue("cvc", "");
    setOpenAddCardDetails(false);
  };

  return (
    <CustomDialog
      title={"Add Card"}
      description="Enter the card details"
      openModal={openAddCardDetails}
      onClose={() => setOpenAddCardDetails(false)}
    >
      <div className="space-y-3">
        <TextInput
          label="Card Holder Name"
          placeholder="Enter holder's name"
          {...register("cardHolderName")}
          error={errors.cardHolderName?.message}
        />

        <NumberInput
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          {...register("cardNumber")}
          error={errors.cardNumber?.message}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <DateInput
            label="Expiry Date"
            placeholder="MM/YY"
            // defaultValue={
            //   house?.completionDate
            //     ? new Date(house?.completionDate).toISOString()
            //     : undefined
            // }
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
            label="CVC"
            placeholder="123"
            {...register("cvc")}
            error={errors.cvc?.message}
          />
        </div>
      </div>

      <DialogFooter>
        <Button className="w-full" onClick={handleSubmit(onSubmit)}>
          Add Card
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default AddCardModal;

const schema = yup.object({
  cardHolderName: yup
    .string()
    .required("Card holder name is required")
    .min(2, "Name is too short"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: yup.string().required("Expiry date is required"),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
});
