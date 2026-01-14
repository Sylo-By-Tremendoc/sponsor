import { Button } from "../../../components/common/Button";
import MultiTextInput from "../../../components/common/MultiTextInput";
import PhoneInput from "../../../components/common/PhoneInput";
import Pill from "../../../components/common/Pill";
import TextInput from "../../../components/common/TextInput";
import { Section, TitleText } from "../home/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validatePhoneNumberWithYup } from "../../../utils/validate-phone-number-with-yup";
import Typography from "../../../components/common/Typography";
import { FieldLabelText } from "../../../components/common/FormHelper";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import contactUsImg from "../../../assets/images/contact-us.png";

const SendAMessage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => {};

  return (
    <Section className="flex flex-col md:flex-row gap-5 md:gap-10 pt-5 md:pt-0">
      <div className="flex-[60%] space-y-4">
        <Pill text="SEND US A MESSAGE" />
        <TitleText className="mx-0">
          Reach out to our team for assistance and to explore our service
          offerings.
        </TitleText>

        <div className="grid md:grid-cols-2 gap-5">
          <TextInput
            required
            label="Full Name"
            {...register("fullName")}
            placeholder="Enter full name"
            error={errors.fullName?.message}
          />
          <TextInput
            required
            label="Email Address"
            {...register("email")}
            placeholder="Enter email email"
            error={errors.email?.message}
          />

          <PhoneInput
            label="Phone Number"
            control={control}
            name="phoneNumber"
            error={errors.phoneNumber?.message}
            required
          />

          <TextInput
            label="Company (Optional)"
            {...register("company")}
            placeholder="Enter company name"
            error={errors.company?.message}
          />

          <div className="md:col-span-2">
            <MultiTextInput
              label="Your Message"
              {...register("message")}
              placeholder="Enter message here"
              error={errors.message?.message}
            />
          </div>
        </div>

        <Button onClick={handleSubmit(onSubmit)} className="w-full mt-5">
          Get In Touch
        </Button>
      </div>

      <div className="hidden md:flex flex-col flex-[40%] bg-[#F9F9FB] border rounded-xl p-3">
        <img
          src={contactUsImg}
          alt="Contact Us"
          className="w-full h-[211px] object-fit rounded-xl overflow-hidden"
        />

        <div className="space-y-3 py-3">
          <div>
            <FieldLabelText
              view
              label="Email Address"
              className="text-charcoal-gray pb-1"
            />
            <Typography variant={"xSmallTextSemibold"}>
              enquiry@tremendoc.com
            </Typography>
          </div>
          <div>
            <FieldLabelText
              view
              label="Phone:"
              className="text-charcoal-gray pb-1"
            />
            <Typography variant={"xSmallTextSemibold"}>
              +1 12 9082 0092
            </Typography>
          </div>
          <div>
            <FieldLabelText
              view
              label="Office:"
              className="text-charcoal-gray pb-1"
            />
            <Typography variant={"xSmallTextSemibold"}>
              456 Business Ave, New York, NY 10001
            </Typography>
          </div>
          <div>
            <FieldLabelText
              view
              label="Socials"
              className="text-charcoal-gray pb-1"
            />
            <div className="flex items-center gap-3">
              <Link
                to="#"
                className="text-black p-2 border border-[#D6D6D6] rounded-full"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                to="#"
                className="text-black p-2 border border-[#D6D6D6] rounded-full"
              >
                <FaXTwitter size={15} />
              </Link>
              <Link
                to="#"
                className="text-black p-2 border border-[#D6D6D6] rounded-full"
              >
                <FaInstagram size={15} />
              </Link>
              <Link
                to="#"
                className="text-black p-2 border border-[#D6D6D6] rounded-full"
              >
                <FaLinkedinIn size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SendAMessage;

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: validatePhoneNumberWithYup({ required: true }).required(
    "Phone number is required"
  ),
  company: yup.string().nullable(),
  message: yup.string().required("Message is required"),
});
