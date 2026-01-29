import { Button } from "@/components/common/Button";
import NumberInput from "@/components/common/NumberInput";
import TextInput from "@/components/common/TextInput";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import InviteBenefactorModal from "./InviteBenefactorModal";
import useAuth from "@/hooks/use-auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@/components/common/Typography";
import { useCurrencyStore } from "@/store/currency-store";
import { convertPrice } from "@/utils/constant";
import BalanceSlider from "@/components/common/BalanceSlider";
import useGetInvitedBenefactorDetails from "../../hooks/use-get-invited-benefactor-details";

type PaymentInfo = {
  plan_id: string;
  beneficiary_id: string;
  billing_interval: string;
};

const InviteBenefactor = ({
  paymentInfo,
  total,
  setSharedContributionAmount,
}: {
  paymentInfo: PaymentInfo;
  total: number;
  setSharedContributionAmount: (val: number) => void;
}) => {
  const { authUser } = useAuth();

  const currency = useCurrencyStore((state) => state?.currency);

  const [sharedPaymentId, setSharedPaymentId] = useState("");

  const {
    data: sharedPaymentDetails,
    isLoading,
    isFetching,
  } = useGetInvitedBenefactorDetails(!!sharedPaymentId, sharedPaymentId);

  const [openInviteBenefactorModal, setOpenInviteBenefactorModal] =
    useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    amount: yup
      .number()
      .typeError("Amount is required")
      .min(0, "Amount cannot be negative")
      .required("Amount is required")
      .test("max-amount", `Amount cannot exceed ${total}`, function (value) {
        return value <= total;
      }),
    minContribution: yup
      .number()
      .typeError("Minimum contribution is required")
      .min(1, "Minimum contribution must be at least 1")
      .required(),
  });

  const {
    watch,
    control,
    setValue,
    register,
    // handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const amount = watch("amount") || 0;
  const minContribution = watch("minContribution") || 1;

  const sharedContributionAmount = useMemo(() => {
    return Number(minContribution) || 1;
  }, [minContribution]);

  useEffect(() => {
    setSharedContributionAmount(sharedContributionAmount);
  }, [sharedContributionAmount, setSharedContributionAmount]);

  useEffect(() => {
    const id = localStorage.getItem("sharedPaymentId");
    if (id) {
      setSharedPaymentId(id);
    }
  }, []);

  useEffect(() => {
    if (!sharedPaymentDetails) return;

    setValue(
      "minContribution",
      Number(sharedPaymentDetails.minimum_contribution),
      { shouldValidate: true }
    );
  }, [sharedPaymentDetails, setValue]);

  useEffect(() => {
    if (authUser?.user?.first_name) {
      setValue(
        "name",
        `${authUser.user.first_name} ${authUser.user.last_name}`
      );
      setValue("minContribution", 1);
    }
  }, [authUser, setValue]);

  // Calculate remaining amount
  const remainingAmount = useMemo(() => {
    const entered = Number(amount) || 0;
    return Math.max(total - entered, 0);
  }, [amount, total]);

  return (
    <div className="p-5 space-y-3 bg-white rounded-2xl">
      <div className="space-y-1">
        <Typography variant={"largeText"}>Invite Benefactor</Typography>

        <Typography variant="smallText" className="text-charcoal-gray pb-3">
          You can invite co-benefactors to help cover the cost of this plan.
        </Typography>

        <div className="flex items-center gap-1 p-3 bg-primary rounded-md">
          <Typography variant={"smallText"}>
            Total amount to be contributed:
          </Typography>
          <Typography variant={"xxlargeTextBold"}>
            {convertPrice(total, currency)}
          </Typography>
        </div>
      </div>

      <div className="grid md:grid-cols-2 items-center gap-4">
        {/* <div className="md:col-span-2"> */}
        <TextInput
          required
          label="You (Main Benefactor)"
          placeholder="Enter name"
          {...register("name")}
          error={errors.name?.message}
          isLoadingField={isLoading || isFetching}
          disabled
          hint={"You are the main benefactor"}
        />
        {/* </div> */}

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              required
              label="Your Contribution"
              prefix={currency?.symbol}
              placeholder="Enter amount"
              value={field.value}
              onChange={field.onChange}
              error={errors.amount?.message}
              isLoadingField={isLoading || isFetching}
              hint={`Remaining amount: ${
                currency?.symbol
              }${remainingAmount.toFixed(2)}`}
              info="This is the amount you, as the main benefactor, will personally contribute toward the total cost of the plan. Any remaining balance can be shared with invited co-benefactors."
            />
          )}
        />

        <div className="md:col-span-2">
          <Controller
            control={control}
            name="minContribution"
            render={({ field }) => (
              <NumberInput
                required
                label="Minimum Co-Benefactor Contribution"
                prefix={currency?.symbol}
                placeholder="Enter minimum amount"
                value={field.value}
                onChange={field.onChange}
                error={errors.minContribution?.message}
                isLoadingField={isLoading || isFetching}
                hint={`Each invited benefactor must contribute at least ${currency?.symbol}${field.value}`}
                info="This sets the minimum amount that each invited co-benefactor must contribute toward the remaining balance."
              />
            )}
          />
        </div>
      </div>

      <BalanceSlider
        label={`Balance ${currency?.symbol}${remainingAmount.toFixed(2)}`}
        min={0}
        max={total}
        value={amount > total ? total : amount}
        onChange={(val) => setValue("amount", val, { shouldValidate: true })}
        currency={currency?.symbol}
      />

      <div>
        <div className="my-5 w-full border border-dashed border-mid-grey contain-none"></div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full md:w-auto flex items-center justify-center gap-2"
        onClick={() => setOpenInviteBenefactorModal(true)}
        disabled={!isValid}
      >
        {sharedPaymentDetails?.id ? "Update Invite" : "Invite Benefactor"}
        <HiOutlinePlus />
      </Button>

      <InviteBenefactorModal
        details={sharedPaymentDetails!}
        paymentInfo={{
          plan_id: paymentInfo?.plan_id || "",
          beneficiary_id: paymentInfo?.beneficiary_id || "",
          billing_interval: paymentInfo?.billing_interval || "",
          minimum_contribution: minContribution,
        }}
        openInviteBenefactorModal={openInviteBenefactorModal}
        setOpenInviteBenefactorModal={setOpenInviteBenefactorModal}
        onSuccess={() => setOpenInviteBenefactorModal(false)}
      />
    </div>
  );
};

export default InviteBenefactor;
