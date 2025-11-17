import { useSponsorStore } from "@/store/sponsor-store";

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
  { id: "AF", name: "Afghanistan" },
  { id: "AL", name: "Albania" },
  { id: "DZ", name: "Algeria" },
  { id: "AD", name: "Andorra" },
  { id: "AO", name: "Angola" },
  { id: "AR", name: "Argentina" },
  { id: "AM", name: "Armenia" },
  { id: "AU", name: "Australia" },
  { id: "AT", name: "Austria" },
  { id: "AZ", name: "Azerbaijan" },
  { id: "BS", name: "Bahamas" },
  { id: "BH", name: "Bahrain" },
  { id: "BD", name: "Bangladesh" },
  { id: "BB", name: "Barbados" },
  { id: "BY", name: "Belarus" },
  { id: "BE", name: "Belgium" },
  { id: "BZ", name: "Belize" },
  { id: "BJ", name: "Benin" },
  { id: "BT", name: "Bhutan" },
  { id: "BO", name: "Bolivia" },
  { id: "BA", name: "Bosnia and Herzegovina" },
  { id: "BW", name: "Botswana" },
  { id: "BR", name: "Brazil" },
  { id: "BN", name: "Brunei" },
  { id: "BG", name: "Bulgaria" },
  { id: "BF", name: "Burkina Faso" },
  { id: "BI", name: "Burundi" },
  { id: "KH", name: "Cambodia" },
  { id: "CM", name: "Cameroon" },
  { id: "CA", name: "Canada" },
  { id: "CV", name: "Cape Verde" },
  { id: "CF", name: "Central African Republic" },
  { id: "TD", name: "Chad" },
  { id: "CL", name: "Chile" },
  { id: "CN", name: "China" },
  { id: "CO", name: "Colombia" },
  { id: "KM", name: "Comoros" },
  { id: "CG", name: "Congo" },
  { id: "CR", name: "Costa Rica" },
  { id: "HR", name: "Croatia" },
  { id: "CU", name: "Cuba" },
  { id: "CY", name: "Cyprus" },
  { id: "CZ", name: "Czech Republic" },
  { id: "DK", name: "Denmark" },
  { id: "DJ", name: "Djibouti" },
  { id: "DO", name: "Dominican Republic" },
  { id: "EC", name: "Ecuador" },
  { id: "EG", name: "Egypt" },
  { id: "SV", name: "El Salvador" },
  { id: "GQ", name: "Equatorial Guinea" },
  { id: "ER", name: "Eritrea" },
  { id: "EE", name: "Estonia" },
  { id: "SZ", name: "Eswatini" },
  { id: "ET", name: "Ethiopia" },
  { id: "FJ", name: "Fiji" },
  { id: "FI", name: "Finland" },
  { id: "FR", name: "France" },
  { id: "GA", name: "Gabon" },
  { id: "GM", name: "Gambia" },
  { id: "GE", name: "Georgia" },
  { id: "DE", name: "Germany" },
  { id: "GH", name: "Ghana" },
  { id: "GR", name: "Greece" },
  { id: "GD", name: "Grenada" },
  { id: "GT", name: "Guatemala" },
  { id: "GN", name: "Guinea" },
  { id: "GW", name: "Guinea-Bissau" },
  { id: "GY", name: "Guyana" },
  { id: "HT", name: "Haiti" },
  { id: "HN", name: "Honduras" },
  { id: "HU", name: "Hungary" },
  { id: "IS", name: "Iceland" },
  { id: "IN", name: "India" },
  { id: "ID", name: "Indonesia" },
  { id: "IR", name: "Iran" },
  { id: "IQ", name: "Iraq" },
  { id: "IE", name: "Ireland" },
  { id: "IL", name: "Israel" },
  { id: "IT", name: "Italy" },
  { id: "JM", name: "Jamaica" },
  { id: "JP", name: "Japan" },
  { id: "JO", name: "Jordan" },
  { id: "KZ", name: "Kazakhstan" },
  { id: "KE", name: "Kenya" },
  { id: "KI", name: "Kiribati" },
  { id: "KR", name: "South Korea" },
  { id: "KW", name: "Kuwait" },
  { id: "KG", name: "Kyrgyzstan" },
  { id: "LA", name: "Laos" },
  { id: "LV", name: "Latvia" },
  { id: "LB", name: "Lebanon" },
  { id: "LS", name: "Lesotho" },
  { id: "LR", name: "Liberia" },
  { id: "LY", name: "Libya" },
  { id: "LI", name: "Liechtenstein" },
  { id: "LT", name: "Lithuania" },
  { id: "LU", name: "Luxembourg" },
  { id: "MG", name: "Madagascar" },
  { id: "MW", name: "Malawi" },
  { id: "MY", name: "Malaysia" },
  { id: "MV", name: "Maldives" },
  { id: "ML", name: "Mali" },
  { id: "MT", name: "Malta" },
  { id: "MR", name: "Mauritania" },
  { id: "MU", name: "Mauritius" },
  { id: "MX", name: "Mexico" },
  { id: "MD", name: "Moldova" },
  { id: "MC", name: "Monaco" },
  { id: "MN", name: "Mongolia" },
  { id: "ME", name: "Montenegro" },
  { id: "MA", name: "Morocco" },
  { id: "MZ", name: "Mozambique" },
  { id: "MM", name: "Myanmar" },
  { id: "NA", name: "Namibia" },
  { id: "NP", name: "Nepal" },
  { id: "NL", name: "Netherlands" },
  { id: "NZ", name: "New Zealand" },
  { id: "NI", name: "Nicaragua" },
  { id: "NE", name: "Niger" },
  { id: "NG", name: "Nigeria" },
  { id: "NO", name: "Norway" },
  { id: "OM", name: "Oman" },
  { id: "PK", name: "Pakistan" },
  { id: "PA", name: "Panama" },
  { id: "PG", name: "Papua New Guinea" },
  { id: "PY", name: "Paraguay" },
  { id: "PE", name: "Peru" },
  { id: "PH", name: "Philippines" },
  { id: "PL", name: "Poland" },
  { id: "PT", name: "Portugal" },
  { id: "QA", name: "Qatar" },
  { id: "RO", name: "Romania" },
  { id: "RU", name: "Russia" },
  { id: "RW", name: "Rwanda" },
  { id: "SA", name: "Saudi Arabia" },
  { id: "SN", name: "Senegal" },
  { id: "RS", name: "Serbia" },
  { id: "SC", name: "Seychelles" },
  { id: "SL", name: "Sierra Leone" },
  { id: "SG", name: "Singapore" },
  { id: "SK", name: "Slovakia" },
  { id: "SI", name: "Slovenia" },
  { id: "SO", name: "Somalia" },
  { id: "ZA", name: "South Africa" },
  { id: "ES", name: "Spain" },
  { id: "LK", name: "Sri Lanka" },
  { id: "SD", name: "Sudan" },
  { id: "SR", name: "Suriname" },
  { id: "SE", name: "Sweden" },
  { id: "CH", name: "Switzerland" },
  { id: "SY", name: "Syria" },
  { id: "TW", name: "Taiwan" },
  { id: "TZ", name: "Tanzania" },
  { id: "TH", name: "Thailand" },
  { id: "TG", name: "Togo" },
  { id: "TT", name: "Trinidad and Tobago" },
  { id: "TN", name: "Tunisia" },
  { id: "TR", name: "Turkey" },
  { id: "UG", name: "Uganda" },
  { id: "UA", name: "Ukraine" },
  { id: "AE", name: "United Arab Emirates" },
  { id: "GB", name: "United Kingdom" },
  { id: "US", name: "United States" },
  { id: "UY", name: "Uruguay" },
  { id: "UZ", name: "Uzbekistan" },
  { id: "VE", name: "Venezuela" },
  { id: "VN", name: "Vietnam" },
  { id: "ZM", name: "Zambia" },
  { id: "ZW", name: "Zimbabwe" },
];

// export const ageRanges = ["18 - 25", "26 - 35", "36 - 45", "46 - 60", "60+"];
export const ageRanges = [
  { id: "18-25", label: "18 - 25 Years" },
  { id: "26-35", label: "26 - 35 Years" },
  { id: "36-45", label: "36 - 45 Years" },
  { id: "46-55", label: "46 - 55 Years" },
  { id: "56-65", label: "56 - 65 Years" },
  { id: "65+", label: "65+ Years" },
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

export const convertPrice = (price: number) => {
  const sponsor = useSponsorStore((state) => state.sponsor);

  const conversionRates: Record<string, number> = {
    NGN: 19000, // Nigerian Naira
    GHS: 155, // Ghanaian Cedi
    KES: 1650, // Kenyan Shilling
    CAD: 17, // Canadian Dollar
    GBP: 1, // British Pound (base)
  };

  const rate = conversionRates[sponsor.id] || 1;
  const converted = price * rate;

  // Format with Sponsor symbol and local style
  return `${sponsor.symbol}${converted.toLocaleString(undefined, {
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
