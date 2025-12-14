export function getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName?.trim().charAt(0).toUpperCase() ?? "";
  const lastInitial = lastName?.trim().charAt(0).toUpperCase() ?? "";

  return firstInitial + lastInitial;
}
