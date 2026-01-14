import TextInput from "../../../components/common/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "../../../components/common/Typography";
import { Button } from "@/components/common/Button";
import FullScreenLoader from "@/components/common/Loader";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useResetPassword from "./hooks/reset-password";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const resetPassword = useResetPassword();

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    const newData = {
      email,
      token,
      password: data?.password ?? "",
      password_confirmation: data?.confirmPassword ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    resetPassword?.mutate(submittedData, {
      onSuccess: () => {
        toast.success("Reset password successfully");
        setIsSuccess(true);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      },
    });
  };

  console.log("error", errors);

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
              SET PASSWORD
            </Typography>
            <h2 className="text-2xl font-semibold pt-3 pb-1">
              Secure Your Account
            </h2>
            <p className="text-sm text-gray-500">
              Enter new and stronger password
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              type="password"
              label={"Password"}
              placeholder={"eg. Paul123#"}
              {...register("password")}
              error={errors.password?.message}
              required
            />

            <TextInput
              type="password"
              label={"Confirm Password"}
              placeholder={"eg. Paul123#"}
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              required
            />

            <Button
              className="w-full text-white  mt-10"
              isLoading={resetPassword?.isPending}
              disabled={resetPassword?.isPending}
              type="submit"
            >
              {resetPassword?.isPending ? "Resetting..." : " Reset Password"}
            </Button>
          </form>

          <FullScreenLoader
            loading={resetPassword?.isPending}
            isSuccess={isSuccess}
            onSuccess={() => navigate("/account/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character (!@#$%^&*)"
    )
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
