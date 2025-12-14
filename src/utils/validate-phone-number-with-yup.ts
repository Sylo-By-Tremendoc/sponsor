import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { string, StringSchema, type TestConfig } from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Options interface
interface PhoneValidatorOptions {
  required?: boolean;
  requiredMessage?: string;
  validationMessage?: string;
  additionalTests?: TestConfig<string | undefined>[];
}

export interface AgeRangeValidatorOptions {
  required?: boolean;
  requiredMessage?: string;
  invalidFormatMessage?: string;
  outOfRangeMessage?: string;
  minAge: number; // dynamic
  maxAge: number; // dynamic
}

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

export const validateAgeRangeWithYup = (
  options: AgeRangeValidatorOptions
): StringSchema => {
  const {
    required = true,
    requiredMessage = "Date of birth is required",
    invalidFormatMessage = "Use format YYYY-MM-DD",
    outOfRangeMessage = "Age is not within allowed range",
    minAge,
    maxAge,
  } = options;

  let validator = string();

  // required check
  if (required) {
    validator = validator.required(requiredMessage);
  }

  // must be yyyy-mm-dd
  validator = validator.matches(/^\d{4}-\d{2}-\d{2}$/, invalidFormatMessage);

  // actual age-range logic
  validator = validator.test({
    name: "age-range",
    message: outOfRangeMessage,
    test: (value?: string) => {
      if (!value) return !required;

      const today = new Date();
      const dob = new Date(value);

      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      return age >= minAge && age <= maxAge;
    },
  });

  return validator;
};

export function getCountyCodeAndPhoneNumber(input: string) {
  if (!input) return;

  const phone = parsePhoneNumberFromString(input);

  if (!phone) {
    return { number: null, countryCode: null };
  }

  return {
    number: phone.nationalNumber, // e.g. "5643464323"
    countryCode: `+${phone.countryCallingCode}`, // e.g. "+1"
  };
}
