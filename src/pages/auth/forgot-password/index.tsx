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
      <div className="hidden bg-black text-white md:flex flex-col justify-between px-10 py-10 z-20">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <h1 className="text-lg font-semibold">
              sylo <span className="text-gray-400 text-sm">By Tremendoc</span>
            </h1>
          </div>
        </div>

        {/* Marketing Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
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
