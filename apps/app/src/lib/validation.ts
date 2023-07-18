export function isValidSlug(
  str?: string | null,
  ignoreLength = false
): boolean {
  // Ensure the slug is at least 3 characters long
  if (!str || (str.length < 3 && !ignoreLength)) {
    return false;
  }

  // Ensure the slug only contains alphanumeric characters (letters and numbers)
  const alphanumericRegex = /^[a-z0-9]+$/i;
  return alphanumericRegex.test(str);
}
