/**
 * Normalizes Bolivian phone number string.
 * Strips non-digits and removes prefix +591 or 591 if present.
 */
export function normalizeBolivianPhone(input: string): string {
  if (!input) return '';
  // Remove all non-digit characters
  let digits = input.replace(/\D/g, '');
  
  // If user pasted with 591 prefix at start and length > 8
  if (digits.startsWith('591') && digits.length > 8) {
    digits = digits.slice(3);
  }
  
  return digits;
}

/**
 * Validates if phone number has exactly 8 digits (standard Bolivian mobile length).
 */
export function isValidBolivianPhone(input: string): boolean {
  const normalized = normalizeBolivianPhone(input);
  return /^[67]\d{7}$/.test(normalized) || /^\d{8}$/.test(normalized);
}

/**
 * Formats 8-digit phone for display e.g. "7123 4567"
 */
export function formatPhoneDisplay(input: string): string {
  const digits = normalizeBolivianPhone(input);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
}
