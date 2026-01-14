export const formatPhoneNumber = (phone?: string) => {
  if (!phone) return "—";

  const cleaned = phone.replace(/\s+/g, "");

  // Nigerian format: +2349014513408 → +234 901 451 3408
  if (cleaned.startsWith("+234") && cleaned.length === 14) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
      7,
      10
    )} ${cleaned.slice(10)}`;
  }

  return cleaned;
};

export const formatGender = (gender?: string) => {
  if (!gender) return "—";

  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
};

export const formatDateOfBirth = (date?: string) => {
  if (!date) return "—";

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatToGetAge = (dob?: string) => {
  if (!dob) return "—";

  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return "—";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return `${age} Years`;
};


export const maskEmail = (email?: string) => {
  if (!email) return "";

  const [username, domain] = email.split("@");
  if (!username || !domain) return email;

  const visibleChars = Math.min(2, username.length);
  const maskedPart = "*".repeat(Math.max(username.length - visibleChars, 3));

  return `${username.slice(0, visibleChars)}${maskedPart}@${domain}`;
};

