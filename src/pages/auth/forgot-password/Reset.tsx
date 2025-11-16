import TextInput from "../../../components/common/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from "../../../components/common/Typography";
import { Button } from "@/components/common/Button";

const Reset = ({ handleNext }: { handleNext: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => {
    handleNext();
  };
  return (
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
        <p className="text-sm text-gray-500">Enter new and stronger password</p>
      </div>

      {/* Form */}
      <form className="space-y-5 mb-10">
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
      </form>

      <Button
        type="submit"
        className="w-full text-white rounded-full py-2.5 font-medium transition-all"
        onClick={handleSubmit(onSubmit)}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default Reset;

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
