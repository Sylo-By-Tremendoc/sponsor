import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import useInviteBenefactors from "../../hooks/use-invite-benefactors";
import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { getErrorMessage } from "@/utils/get-error-message";
import type { SharedPaymentDetails } from "@/types/plans";

type PaymentInfoPops = {
  plan_id: string;
  beneficiary_id: string;
  billing_interval: string;
  minimum_contribution: number;
};

const InviteBenefactorModal = ({
  details,
  paymentInfo,
  openInviteBenefactorModal,
  setOpenInviteBenefactorModal,
  onSuccess,
}: {
  details: SharedPaymentDetails;
  paymentInfo: PaymentInfoPops;
  openInviteBenefactorModal: boolean;
  setOpenInviteBenefactorModal: (val: boolean) => void;
  onSuccess: () => void;
}) => {
  const inviteBenefactors = useInviteBenefactors();

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<CreateSchemaType>({
    resolver: yupResolver(schema),
    defaultValues: { emails: [] },
  });

  const emails = watch("emails");

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const newData = {
      plan_id: paymentInfo?.plan_id || "",
      beneficiary_id: paymentInfo?.beneficiary_id || "",
      billing_interval: paymentInfo?.billing_interval || "",
      emails: data?.emails || [],
      minimum_contribution: Number(paymentInfo?.minimum_contribution) || 1,
      expires_in_hours: 24,
    };

    const submittedData = replaceEmptyStringsWithNull(newData);
    inviteBenefactors.mutate(submittedData, {
      onSuccess: (res) => {
        toast.success("Invites sent successfully");

        console.log("RESPONSE", res);

        const sharedPaymentId = res?.data?.id;

        if (sharedPaymentId) {
          localStorage.setItem("sharedPaymentId", sharedPaymentId);
        }

        onSuccess();
        handleReset();
      },
      onError: (error: any) => {
        toast.error(getErrorMessage(error?.message, "Something went wrong."));
      },
    });
  };

  const handleReset = () => {
    setValue("emails", []);
  };

  useEffect(() => {
    if (details) {
      setValue("emails", details?.participants);
    }
  }, [details]);

  return (
    <CustomDialog
      title="Invite Co-Benefactors"
      description="Send an invite to the benefactors email address."
      openModal={openInviteBenefactorModal}
      onClose={() => {
        handleReset();
        setOpenInviteBenefactorModal(false);
      }}
      //   className="md:max-w-[50%]"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <EmailChipsInput
          value={emails}
          onChange={(val) => setValue("emails", val, { shouldValidate: true })}
          error={errors.emails?.message}
        />

        <p className="mt-2 text-xs text-gray-500">
          Type an email and press <span className="font-medium">Enter</span> or{" "}
          <span className="font-medium">Comma</span> to add multiple emails
        </p>

        <DialogFooter className="pt-8">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setOpenInviteBenefactorModal(false)}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={inviteBenefactors.isPending}
            disabled={!isValid || inviteBenefactors.isPending}
            className="w-full"
          >
            {inviteBenefactors.isPending ? "Sending..." : "Send Invites"}
          </Button>
        </DialogFooter>
      </form>
    </CustomDialog>
  );
};

export default InviteBenefactorModal;

const EmailChipsInput = ({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (emails: string[]) => void;
  error?: string;
}) => {
  const [input, setInput] = useState("");

  const addEmail = () => {
    const email = input.trim().toLowerCase();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    if (!value.includes(email)) {
      onChange([...value, email]);
    }
    setInput("");
  };

  return (
    <div>
      <label className="text-sm font-medium mb-1 block">Email Addresses</label>

      <div
        className={`flex flex-wrap gap-2 p-3 rounded-xl border
          ${error ? "border-danger" : "border-gray-300"}
          focus-within:border-primary`}
      >
        {value.map((email) => (
          <span
            key={email}
            className="flex items-center gap-1 px-3 py-1 rounded-full
              bg-primary/10 text-primary text-sm"
          >
            {email}
            <button
              type="button"
              onClick={() => onChange(value.filter((e) => e !== email))}
            >
              <HiOutlineX size={14} />
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (["Enter", ",", " "].includes(e.key)) {
              e.preventDefault();
              addEmail();
            }
          }}
          placeholder="Enter email and press Enter or comma"
          className="flex-1 min-w-[220px] outline-none text-sm"
        />
      </div>

      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
};

const schema = yup.object({
  emails: yup
    .array()
    .of(yup.string().email("Invalid email").required())
    .min(1, "At least one email is required")
    .required(),
});
