import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { string, StringSchema, type TestConfig } from "yup";

// Options interface
interface PhoneValidatorOptions {
  required?: boolean;
  requiredMessage?: string;
  validationMessage?: string;
  additionalTests?: TestConfig<string | undefined>[];
}

/**
 * Creates a reusable Yup validator for phone numbers
 * @param options Configuration options for the validator
 * @returns A Yup string schema with phone number validation
 */
export const validatePhoneNumberWithYup = (
  options: PhoneValidatorOptions = {}
): StringSchema => {
  const {
    required = true,
    requiredMessage = "Phone Number is required",
    validationMessage = "Please enter a valid Phone Number",
  } = options;

  let validator = string();

  if (required) {
    validator = validator.required(requiredMessage);
  }

  // Base phone validation test
  validator = validator.test({
    name: "isValidPhoneNumber",
    test: (phoneNumber: string | undefined): boolean => {
      if (!phoneNumber) return !required;
      return (
        isPossiblePhoneNumber(phoneNumber) && isValidPhoneNumber(phoneNumber)
      );
    },
    message: validationMessage,
  });

  return validator;
};
