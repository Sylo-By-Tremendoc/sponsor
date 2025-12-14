import Typography from "@/components/common/Typography";
import * as yup from "yup";
import PaymentCard, {
  type PaymentCardInfo,
} from "../../components/PaymentCard";
import { Button } from "@/components/common/Button";
import { HiOutlinePlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/common/TextInput";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import NumberInput from "@/components/common/NumberInput";
import { DateInput } from "@/components/common/DateInput";

const AddPaymentMethod = ({
  paymentCardDetails,
  setPaymentCardDetails,
  handleDeleteCardDetails,
}: {
  paymentCardDetails: PaymentCardInfo;
  setPaymentCardDetails: (val: PaymentCardInfo) => void;
  handleDeleteCardDetails: () => void;
}) => {
  const {
    watch,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
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
    <section className="space-y-4">
      {paymentCardDetails ? (
        <PaymentCard
          cardDetails={paymentCardDetails}
          onDelete={handleDeleteCardDetails}
          className="shadow-sm hover:shadow-md transition-all duration-200"
        />
      ) : (
        <div className="p-5 space-y-3 bg-white rounded-2xl">
          <Typography variant={"largeText"}>Add new payment method</Typography>

          <div className="grid md:grid-cols-2 gap-4 pb-3">
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

            <label className="flex items-center gap-2 mt-2 md:col-span-2">
              <CheckBoxInput
                checked={saveCard}
                onChange={(val) => setValue("saveCard", val)}
              />

              <Typography variant={"xSmallText"} className="text-charcoal-gray">
                Save card for monthly/yearly charges
              </Typography>
            </label>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSubmit(onSubmit)}
          >
            Add Payment Card
            <HiOutlinePlus />
          </Button>
        </div>
      )}
    </section>
  );
};

export default AddPaymentMethod;

export const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),

  cardHolderName: yup
    .string()
    .required("Card holder's name is required")
    .min(3, "Name is too short"),

  expiryDate: yup
    .string()
    .required("Expiry date is required"),

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
