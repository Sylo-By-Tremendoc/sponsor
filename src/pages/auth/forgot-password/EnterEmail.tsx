import TextInput from "../../../components/common/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Typography from "../../../components/common/Typography";
import useResetPassword from "./hooks/use-reset-password";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import { toast } from "react-toastify";
import { Button } from "@/components/common/Button";

const EnterEmail = ({ handleNext }: { handleNext: () => void }) => {
  const resetPassword = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const newData = {
      email: data?.email ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    resetPassword?.mutate(submittedData, {
      onSuccess: () => {
        toast.success("An OTP has been sent to your email.");
        handleNext();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      },
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Typography
          variant={"xxSmallText"}
          className="inline-block px-4 py-1 border border-gray-400 rounded-full "
        >
          FORGOT PASSWORD
        </Typography>
        <h2 className="text-2xl font-semibold pt-3 pb-1">Reset Password</h2>
        <p className="text-sm text-gray-500">
          Enter the email address attached to your account
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <TextInput
          label="Email Address"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email?.message}
          required
        />

        <Button
          className="w-full text-white rounded-full py-2.5 font-medium transition-all"
          isLoading={resetPassword?.isPending}
          disabled={resetPassword?.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Continue
        </Button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Not a member?{" "}
          <Link
            to="/account/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EnterEmail;

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});
