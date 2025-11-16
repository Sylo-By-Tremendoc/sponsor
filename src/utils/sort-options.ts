/**
 * Checks if a string represents a valid number
 */
function isStringifiedNumber(str: string): boolean {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str)) && str.trim() !== "";
}

/**
 * Sorts an array of options with label and value properties.
 * If all values are stringified numbers, sorts by numeric value.
 * Otherwise, sorts by label alphabetically.
 */
export function sortOptions<T extends { value: string; label: string }>(options: T[]): T[] {
  if (!options || options.length < 2) {
    return options;
  }

  // Check if all values are stringified numbers
  const allValuesAreNumbers = options.every((option) => isStringifiedNumber(option.value));

  if (allValuesAreNumbers) {
    // Sort by numeric value
    return [...options].sort((a, b) => {
      const numA = parseFloat(a.value);
      const numB = parseFloat(b.value);
      return numA - numB;
    });
  } else {
    // Sort by label alphabetically
    return [...options].sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
  }
}
