import { useState } from "react";
import { replaceEmptyStringsWithNull } from "../../../utils/constant";
import TextInput from "../../../components/common/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Typography from "../../../components/common/Typography";
import { toast } from "react-toastify";
import { Button } from "@/components/common/Button";
import FullScreenLoader from "@/components/common/Loader";
import useForgotPassword from "./hooks/use-forgot-password";
import Icons from "@/components/common/Icons";
import authImg from "../../..//assets/images/auth-img.jpg";

const ForgotPassword = () => {
  const forgotPassword = useForgotPassword();

  const [isSuccess, setIsSuccess] = useState(false);

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

    forgotPassword?.mutate(submittedData, {
      onSuccess: () => setIsSuccess(true),
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      },
    });
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section */}
      <div
        style={{ backgroundImage: `url(${authImg})` }}
        className="
    relative hidden md:flex flex-col justify-between
    px-10 py-10 text-white
    bg-cover bg-center bg-no-repeat
  "
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Header */}
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2 cursor-pointer"
        >
          <Icons iconName="logo" />
          <span className="text-sm font-semibold">SyloCare</span>
        </Link>

        {/* Marketing Text */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug bg-gradient-to-r from-white via-white/90 to-primary bg-clip-text text-transparent">
            Send Healthcare Home, <br /> Just Like you Send Money.
          </h2>
          <p className="text-sm text-gray-300 mt-4">
            Diasporas in the UK, US and Canada can now provide comprehensive
            healthcare coverage for family back home.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white flex flex-col justify-center items-center px-5 md:px-8 py-10">
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
          <form
            className="space-y-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              label="Email Address"
              placeholder="Enter email address"
              {...register("email")}
              error={errors.email?.message}
              required
            />

            <Button
              className="w-full text-white"
              isLoading={forgotPassword?.isPending}
              disabled={forgotPassword?.isPending}
              type="submit"
            >
              {forgotPassword?.isPending ? "Continuing..." : " Continue"}
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

          <FullScreenLoader
            loading={forgotPassword?.isPending}
            isSuccess={isSuccess}
            onSuccess={() =>
              toast.success(
                "A password reset link has been sent to your email address."
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});
