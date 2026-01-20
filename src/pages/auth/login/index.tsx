import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../../../components/common/TextInput";
import Typography from "../../../components/common/Typography";
import { Button } from "../../../components/common/Button";
import useLogin from "./hooks/use-login";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import FullScreenLoader from "@/components/common/Loader";
import { useState } from "react";
import Icons from "@/components/common/Icons";
import CheckBoxInput from "@/components/common/CheckBoxInput";
import authImg from "../../..//assets/images/auth-img.jpg";

const Login = () => {
  const login = useLogin();

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
      password: data?.password ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    login?.mutate(submittedData, {
      onSuccess: () => setIsSuccess(true),
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
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
              LOG IN
            </Typography>
            <h2 className="text-2xl font-semibold pt-3 pb-1">Welcome Back</h2>
            <p className="text-sm text-gray-500">
              Sign in your existing credentials
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email"
              placeholder="Enter email"
              {...register("email")}
              error={errors.email?.message}
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

            <div className="flex justify-between items-center text-sm">
              <CheckBoxInput label="Remember me" />

              <Link
                to="/account/forgot-password"
                className="text-gray-500 hover:underline hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              className="w-full text-white"
              isLoading={login?.isPending}
              disabled={login?.isPending}
              type="submit"
            >
              {login?.isPending ? "Logging in..." : "Login"}
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
      </div>

      <FullScreenLoader loading={login?.isPending} isSuccess={isSuccess} />
    </div>
  );
};

export default Login;

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short"),
});
