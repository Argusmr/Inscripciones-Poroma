/**
 * Generates a registration code formatted CEA-2026-XXXXXX
 * Uses easy-to-read numbers and letters.
 */
export function generateRegistrationCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return `CEA-2026-${result}`;
}

