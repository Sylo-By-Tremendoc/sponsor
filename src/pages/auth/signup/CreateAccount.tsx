import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../../../components/common/TextInput";
import Typography from "../../../components/common/Typography";
import PhoneInput from "../../../components/common/PhoneInput";
import DropdownInput from "../../../components/common/DropdownInput";
import {
  countryData,
  replaceEmptyStringsWithNull,
} from "../../../utils/constant";
import { validatePhoneNumberWithYup } from "../../../utils/validate-phone-number-with-yup";
import useCreateAccount from "./hooks/use-create-account";
import { Button } from "@/components/common/Button";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import { useState } from "react";
import { toast } from "react-toastify";
import FullScreenLoader from "@/components/common/Loader";

const CreateAccount = ({ handleNext }: { handleNext: () => void }) => {
  const createAccount = useCreateAccount();

  const [agree, setAgree] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  type CreateSchemaType = yup.InferType<typeof schema>;
  const onSubmit = (data: CreateSchemaType) => {
    if (!agree) {
      toast.info("You must agree to the Terms and Conditions to continue.");
      return;
    }

    const newData = {
      email: data?.email ?? "",
      fullName: data?.fullName ?? "",
      address: data?.address ?? "",
      country: data?.country ?? "",
      phoneNumber: data?.phoneNumber ?? "",
      password: data?.password ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    createAccount?.mutate(submittedData, {
      onSuccess: () => setIsSuccess(true),
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Account creation failed. Please try again.";
        setIsSuccess(true);
        toast.error(message);
      },
    });
  };

  return (
    <div className="w-full max-w-md flex-1">
      <div className="text-center mb-8">
        <Typography
          variant="xxSmallText"
          className="inline-block px-4 py-1 border border-gray-400 rounded-full"
        >
          SIGN UP
        </Typography>
        <h2 className="text-2xl font-semibold pt-3 pb-1">Create an Account</h2>
        <p className="text-sm text-gray-500">
          It’s free and simple, set up your profile
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <TextInput
          label="Full Name"
          placeholder="Enter full name"
          {...register("fullName")}
          error={errors.fullName?.message}
          required
        />

        <div className="grid md:grid-cols-2 items-center gap-5">
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          <PhoneInput
            label="Phone Number"
            control={control}
            name="phoneNumber"
            error={errors.phoneNumber?.message}
            required
          />
        </div>

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <DropdownInput
              label="Country"
              placeholder="Select Country"
              options={
                countryData?.map((country) => ({
                  label: country.name,
                  value: country.id,
                })) || []
              }
              error={errors.country?.message}
              value={field.value || ""}
              required
              hint="Select your country of residence"
              onValueChange={(val) => field.onChange(val)}
            />
          )}
        />

        <TextInput
          label="Home Address"
          placeholder="Enter address"
          {...register("address")}
          error={errors.address?.message}
          required
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Enter password"
          {...register("password")}
          error={errors.password?.message}
          required
        />

        <div className="flex items-center space-x-2">
          <CheckBoxInput
            label="I agree to Tremendoc's"
            checked={agree}
            onChange={(checked) => setAgree(checked)}
          />
          <Link to="#" className="text-primary underline text-sm">
            Terms and Conditions
          </Link>
        </div>

        <Button
          className="w-full text-white rounded-full py-2.5 font-medium transition-all"
          isLoading={createAccount?.isPending}
          disabled={createAccount?.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Create Account
        </Button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already a member?{" "}
          <Link
            to="/account/login"
            className="text-primary font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>

      <FullScreenLoader
        loading={createAccount?.isPending}
        isSuccess={isSuccess}
        onSuccess={() => handleNext()}
      />
    </div>
  );
};

export default CreateAccount;

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: validatePhoneNumberWithYup({ required: true }).required(
    "Phone number is required"
  ),
  country: yup.string().required("Country is required"),
  address: yup.string().required("Home address is required"),
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
});
