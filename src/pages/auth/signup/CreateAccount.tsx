import { Link, useNavigate } from "react-router-dom";
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
import {
  getCountyCodeAndPhoneNumber,
  validatePhoneNumberWithYup,
} from "../../../utils/validate-phone-number-with-yup";
import useCreateAccount from "./hooks/use-create-account";
import { Button } from "@/components/common/Button";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import { useState } from "react";
import { toast } from "react-toastify";
import FullScreenLoader from "@/components/common/Loader";

const CreateAccount = ({ handleNext }: { handleNext: () => void }) => {
  const navigate = useNavigate();
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

    const phoneData = getCountyCodeAndPhoneNumber(data?.phoneNumber);

    const phoneNumber = phoneData?.number;
    const countryCode = phoneData?.countryCode;

    const newData = {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      email: data?.email ?? "",
      phone: phoneNumber ?? "",
      countryCode: countryCode ?? "",
      country: data?.country ?? "",
      homeAddress: data?.address ?? "",
      password: data?.password ?? "",
      password_confirmation: data?.confirmPassword ?? "",
      termsAccepted: true,
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    createAccount?.mutate(submittedData, {
      onSuccess: () => {
        setIsSuccess(true);

        navigate(`?email=${encodeURIComponent(submittedData.email)}`, {
          replace: true, // optional: avoids adding to browser history
        });
      },
      onError: (error: any) => {
        const message =
          error?.message ||
          "Account creation failed. Please try again.";
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
        <div className="grid md:grid-cols-2 items-center gap-5">
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...register("firstName")}
            error={errors.firstName?.message}
            required
          />

          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...register("lastName")}
            error={errors.lastName?.message}
            required
          />
        </div>

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
            defaultCountry="CA"
            allowedCountries={["US", "CA", "GB"]}
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

        <div className="grid md:grid-cols-2 items-center gap-5">
          <TextInput
            label="Password"
            type="password"
            placeholder={"eg. Paul123#"}
            {...register("password")}
            error={errors.password?.message}
            required
          />

          <TextInput
            required
            label={"Confirm Password"}
            placeholder={"eg. Paul123#"}
            type={"password"}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

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
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
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
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
