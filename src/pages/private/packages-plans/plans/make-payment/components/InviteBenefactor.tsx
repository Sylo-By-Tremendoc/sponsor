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

const InviteBenefactor = ({ total }: { total: number }) => {
  const { authUser } = useAuth();

  const [openInviteBenefactorModal, setOpenInviteBenefactorModal] =
    useState(false);

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

  const amount = watch("amount");

  useEffect(() => {
    if (authUser?.user?.first_name) {
      setValue(
        "name",
        `${authUser.user.first_name} ${authUser.user.last_name}`
      );
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

        <Typography variant="smallText" className="text-charcoal-gray">
          You can invite co-benefactors to help cover the cost of this plan.
        </Typography>
      </div>

      <div className="grid grid-cols-2 items-center gap-5 ">
        <TextInput
          required
          label="You (Main Benefactor)"
          placeholder="Enter name"
          {...register("name")}
          error={errors.name?.message}
          disabled
          hint={"You are the main benefactor"}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <NumberInput
              label="Amount"
              prefix="$"
              placeholder="Enter amount"
              value={field.value}
              onChange={field.onChange}
              error={errors.amount?.message}
              hint={`Remaining amount: $${remainingAmount.toFixed(2)}`}
            />
          )}
        />
      </div>

       <div><div className="my-5 w-full border border-dashed border-mid-grey contain-none"></div></div>

      <Button
        type="button"
        variant="outline"
        className="w-full md:w-auto flex items-center justify-center gap-2"
        onClick={() => setOpenInviteBenefactorModal(true)}
        disabled={!isValid}
      >
        Add Benefactor
        <HiOutlinePlus />
      </Button>

      <InviteBenefactorModal
        openInviteBenefactorModal={openInviteBenefactorModal}
        setOpenInviteBenefactorModal={setOpenInviteBenefactorModal}
        onSuccess={() => setOpenInviteBenefactorModal(false)}
      />
    </div>
  );
};

export default InviteBenefactor;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup.string().required("Amount is required"),
});
