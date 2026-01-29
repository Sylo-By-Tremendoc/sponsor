import { Link, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import PhoneInput from "@/components/common/PhoneInput";
import DropdownInput from "@/components/common/DropdownInput";
import { countryData, replaceEmptyStringsWithNull } from "@/utils/constant";
import {
  getCountyCodeAndPhoneNumber,
  validatePhoneNumberWithYup,
} from "@/utils/validate-phone-number-with-yup";
import { Button } from "@/components/common/Button";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FullScreenLoader from "@/components/common/Loader";
import useJoinAsCoBenefactor from "./hooks/use-join-as-co-benefactor";
import { getErrorMessage } from "@/utils/get-error-message";

const SetupAccount = ({ handleNext }: { handleNext: () => void }) => {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("token"); // from invite link

  const joinAsCoBenefactor = useJoinAsCoBenefactor();
  const [agree, setAgree] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Optional: prefill email from invite
  useEffect(() => {
    const emailFromInvite = searchParams.get("email");
    if (emailFromInvite) {
      reset({ email: emailFromInvite });
    }
  }, [reset, searchParams]);

  type JoinSchemaType = yup.InferType<typeof schema>;

  const onSubmit = (data: JoinSchemaType) => {
    if (!agree) {
      toast.info("You must agree to the Terms and Conditions to continue.");
      return;
    }

    if (!inviteToken) {
      toast.error("Invalid or missing invitation.");
      return;
    }

    const phoneData = getCountyCodeAndPhoneNumber(data.phoneNumber!);

    const payload = replaceEmptyStringsWithNull({
      invitation_token: inviteToken,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: phoneData?.number,
      countryCode: phoneData?.countryCode,
      country: data.country,
      homeAddress: data.address,
      password: data.password,
      password_confirmation: data.confirmPassword,
      termsAccepted: true,
    });

    joinAsCoBenefactor.mutate(payload, {
      onSuccess: () => {
        toast.success("You've successfully joined as a co-benefactor");
      },
      onError: (error: any) => {
        toast.error(
          getErrorMessage(
            error?.message,
            "Failed to join as a co-benefactor. Please try again.",
          ),
        );
      },
    });
  };

  return (
    <div className="w-full flex-1">
      <div className="text-center mb-8">
        <Typography
          variant="xxSmallText"
          className="inline-block px-4 py-1 border border-gray-400 rounded-full"
        >
          INVITATION
        </Typography>

        <h2 className="text-2xl font-semibold pt-3 pb-1">
          Join as a Co-Benefactor
        </h2>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          You’ve been invited to contribute towards a shared healthcare plan.
          Create your account to continue.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
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

        <div className="grid md:grid-cols-2 gap-5">
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
              options={countryData.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
              value={field.value || ""}
              onValueChange={field.onChange}
              error={errors.country?.message}
              required
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

        <div className="grid md:grid-cols-2 gap-5">
          <TextInput
            label="Password"
            type="password"
            placeholder={"eg. Paul123#"}
            {...register("password")}
            error={errors.password?.message}
            required
          />

          <TextInput
            label="Confirm Password"
            type="password"
            placeholder={"eg. Paul123#"}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <CheckBoxInput
            label="I agree to the Terms and Conditions"
            checked={agree}
            onChange={setAgree}
          />
        </div>

        <Button
          className="w-full rounded-full"
          isLoading={joinAsCoBenefactor.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          Join & Continue
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/account/login" className="text-primary font-medium">
            Log in
          </Link>
        </p>
      </form>

      <FullScreenLoader
        loading={joinAsCoBenefactor.isPending}
        isSuccess={joinAsCoBenefactor.isSuccess}
        onSuccess={() => handleNext()}
      />
    </div>
  );
};

export default SetupAccount;

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: validatePhoneNumberWithYup({ required: true }),
  country: yup.string().required(),
  address: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/\d/)
    .matches(/[!@#$%^&*]/)
    .matches(/[A-Z]/),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
