import Avatar from "../assets/images/user-placeholder.jpg";
import type { CurrencyDropdownParams } from "@/components/navbar/components/CurrencyDropdown";

const transition = {
  duration: 0.4,
  ease: "easeInOut",
};
export const smoothSlideVariant = {
  forward: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1, transition },
    exit: { x: -300, opacity: 0, transition },
  },
  backward: {
    initial: { x: -300, opacity: 0 },
    animate: { x: 0, opacity: 1, transition },
    exit: { x: 300, opacity: 0, transition },
  },
};

export const countryData = [
  { id: "CA", name: "Canada" },
  { id: "US", name: "United States" },
  { id: "UK", name: "United Kingdom" },
];

// export const ageRanges = ["18 - 25", "26 - 35", "36 - 45", "46 - 60", "60+"];
export const ageRanges = [
  { id: "0-17", label: "0 - 17 Years" },
  { id: "18-30", label: "18 - 30 Years" },
  { id: "31-50", label: "31 - 50 Years" },
  { id: "51-70", label: "51 - 70 Years" },
  { id: "70+", label: "70+ Years" },
];

export const sponsorCountries = [
  {
    id: "CAD",
    label: "Canada",
    symbol: "C$",
    flag: "https://flagcdn.com/w160/ca.png",
  },
  {
    id: "USD",
    label: "United States",
    symbol: "$",
    flag: "https://flagcdn.com/w160/us.png",
  },
  {
    id: "GBP",
    label: "United Kingdom",
    symbol: "£",
    flag: "https://flagcdn.com/w160/gb.png",
  },
];

export const CURRENCIES = [
  {
    id: "CAD",
    label: "Canadian Dollar",
    symbol: "C$",
    flag: "https://flagcdn.com/w160/ca.png",
  },
  {
    id: "GBP",
    label: "British Pound",
    symbol: "£",
    flag: "https://flagcdn.com/w160/gb.png",
  },
  {
    id: "USD",
    label: "US Dollar",
    symbol: "$",
    flag: "https://flagcdn.com/w160/us.png",
  },
  {
    id: "EUR",
    label: "Euro",
    symbol: "€",
    flag: "https://flagcdn.com/w160/eu.png",
  },
];

export const beneficiaryCountries = [
  { id: "GH", label: "Ghana", code: "gh", flag: "/flags/gh.svg" },
  { id: "NG", label: "Nigeria", code: "ng", flag: "/flags/ng.svg" },
  { id: "KE", label: "Kenya", code: "ke", flag: "/flags/ke.svg" },
  // { id: "IN", label: "India", code: "in", flag: "/flags/in.svg" },
];

export const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  // { label: "Other", value: "OTHER" },
];

export const convertPrice = (
  price: number,
  currency: CurrencyDropdownParams
) => {
  // const currency = useCurrencyStore((state) => state?.currency);

  const conversionRates: Record<string, number> = {
    NGN: 19000, // Nigerian Naira
    GHS: 155, // Ghanaian Cedi
    KES: 1650, // Kenyan Shilling
    CAD: 17, // Canadian Dollar
    GBP: 1, // British Pound (base)
  };

  const rate = conversionRates[currency?.id] || 1;
  const converted = price * rate;

  // Format with currency symbol and local style
  return `${currency?.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const convertToTitleCase = (str: string | undefined | number) => {
  str = String(str);
  if (!str) {
    return "";
  }
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
};

export const replaceEmptyStringsWithNull = (obj: any): any => {
  const result: any = {};

  for (const key in obj) {
    if (obj[key] === "" || obj[key] === undefined) {
      // Replace empty strings and undefined with null
      result[key] = null;
    } else if (Array.isArray(obj[key])) {
      // Retain empty arrays as they are
      result[key] = obj[key];
    } else if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // Recursively handle nested objects
      const nestedResult = replaceEmptyStringsWithNull(obj[key]);

      // Check if the nested object is empty after processing
      if (Object.keys(nestedResult).length === 0) {
        result[key] = null; // Replace empty objects with null
      } else {
        result[key] = nestedResult; // Retain non-empty objects
      }
    } else {
      result[key] = obj[key]; // Keep other values as they are
    }
  }

  return result;
};

export const formatDate = (date: string) => {
  if (date) {
    const dateValue = new Date(date);

    // Format the date
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat(
      "en-GB",
      options as Intl.DateTimeFormatOptions
    ).format(dateValue);

    // Format day with 'st', 'nd', 'rd', 'th' suffix
    const day = dateValue.getDate();
    let suffix = "th"; // Default suffix

    // Handle special cases for 11th, 12th, 13th
    if (day % 10 === 1 && day !== 11) {
      suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
      suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
      suffix = "rd";
    }

    // Format the day with its suffix
    const dayWithSuffix = `${day}${suffix}`;

    // Replace the day in the formatted date with the day with suffix
    return formattedDate.replace(day.toString(), dayWithSuffix);
  }
  return "";
};

export const getSponsorCountry = (code: string) => {
  return sponsorCountries.find(
    (country) => country.id === code || country.id.slice(0, 2) === code
  );
};

export const defaultImages = {
  avatar: Avatar,
};

export const buildResetValues = (filters: any[]) => {
  const values: Record<string, any> = {};

  filters.forEach((filter) => {
    switch (filter.type) {
      case "date":
        values[filter.name] = filter.defaultValue ?? null;
        break;

      case "select":
        values[filter.name] = filter.defaultValue ?? "";
        break;

      default:
        values[filter.name] = filter.defaultValue ?? "";
    }
  });

  return values;
};

export const splitAgeBracket = (ageBracket: string) => {
  const [min, max] = ageBracket?.split("-")?.map(Number);

  return {
    minAge: min,
    maxAge: max,
  };
};

export const displayAgeRange = (min?: number, max?: number): string => {
  if (min && max) {
    return `${min} – ${max} years`;
  }

  if (min && !max) {
    return `${min}+ years`;
  }

  if (!min == null && max) {
    return `Up to ${max} years`;
  }

  return "All ages";
};
