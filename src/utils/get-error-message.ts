export const getErrorMessage = (
  error: any,
  fallbackMessage = "Something went wrong"
) => {
  // ✅ Case 1: Already-normalized backend error
  if (error?.errors && typeof error.errors === "object") {
    const fieldMessages = Object.values(error.errors)
      .flat()
      .filter(Boolean);

    if (fieldMessages.length > 0) {
      return fieldMessages.join(" ");
    }
  }

  // ✅ Case 2: Normalized message
  if (typeof error?.message === "string") {
    return error.message;
  }

  // ✅ Case 3: Raw Axios error
  if (error?.response?.data) {
    const { message, errors } = error.response.data;

    if (errors && typeof errors === "object") {
      const fieldMessages = Object.values(errors)
        .flat()
        .filter(Boolean);

      if (fieldMessages.length > 0) {
        return fieldMessages.join(" ");
      }
    }

    if (typeof message === "string") {
      return message;
    }
  }

  // ✅ Case 4: JS Error
  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
