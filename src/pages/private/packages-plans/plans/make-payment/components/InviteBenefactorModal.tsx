import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import TextInput from "@/components/common/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import useInviteBenefactors from "../../hooks/use-invite-benefactors";

const InviteBenefactorModal = ({
  openInviteBenefactorModal,
  setOpenInviteBenefactorModal,
  onSuccess,
}: {
  openInviteBenefactorModal: boolean;
  setOpenInviteBenefactorModal: (val: boolean) => void;
  onSuccess: () => void;
}) => {
  const inviteBenefactors = useInviteBenefactors();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const newData = {
      email: data?.email ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    inviteBenefactors?.mutate(submittedData, {
      onSuccess: () => {
        toast.success("An OTP has been sent to your email.");
        onSuccess();
        handleReset();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      },
    });
  };

  const handleReset = () => {
    setValue("email", "");
  };

  return (
    <CustomDialog
      title="Invite Benefactor"
      description="Send an invite to the benefactors email address."
      openModal={openInviteBenefactorModal}
      onClose={() => {
        handleReset();
        setOpenInviteBenefactorModal(false);
      }}
      //   className="md:max-w-[50%]"
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email?.message}
        />

        <DialogFooter className="md:col-span-2 pt-8">
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
            disabled={inviteBenefactors.isPending}
            className="w-full"
          >
            {inviteBenefactors.isPending ? "Sending..." : "Send Invite"}
          </Button>
        </DialogFooter>
      </form>
    </CustomDialog>
  );
};

export default InviteBenefactorModal;

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});
