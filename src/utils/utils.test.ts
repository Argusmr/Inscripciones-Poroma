import { normalizeBolivianPhone, isValidBolivianPhone, formatPhoneDisplay } from './phone';
import { getCountdownInfo } from './countdown';
import { generateRegistrationCode } from './codeGenerator';

// Simple lightweight test runner script
export function runUnitTests() {
  console.log('--- RUNNING UNIT TESTS ---');

  // 1. Phone Normalization Tests
  const raw1 = '+591 7123 4567';
  const norm1 = normalizeBolivianPhone(raw1);
  console.assert(norm1 === '71234567', `Phone test 1 failed: expected '71234567', got '${norm1}'`);

  const raw2 = '59167641695';
  const norm2 = normalizeBolivianPhone(raw2);
  console.assert(norm2 === '67641695', `Phone test 2 failed: expected '67641695', got '${norm2}'`);

  console.assert(isValidBolivianPhone('71234567') === true, 'Phone test 3 failed: valid phone marked invalid');
  console.assert(isValidBolivianPhone('12345') === false, 'Phone test 4 failed: invalid phone marked valid');

  console.assert(formatPhoneDisplay('71234567') === '7123 4567', 'Phone display format test failed');

  // 2. Countdown Tests
  const futureDate = new Date('2026-07-21T12:00:00-04:00'); // 20 days before Aug 10 2026
  const countdownInfo = getCountdownInfo(futureDate);
  console.assert(countdownInfo.daysRemaining === 20, `Countdown test failed: expected 20 days, got ${countdownInfo.daysRemaining}`);
  console.assert(countdownInfo.message === '¡Te quedan 20 días!', `Countdown message test failed: got '${countdownInfo.message}'`);

  const lastDay = new Date('2026-08-10T12:00:00-04:00');
  const lastDayInfo = getCountdownInfo(lastDay);
  console.assert(lastDayInfo.isToday === true, 'Last day test failed');
  console.assert(lastDayInfo.message === '¡Hoy es el último día!', 'Last day message test failed');

  const expiredDate = new Date('2026-08-11T12:00:00-04:00');
  const expiredInfo = getCountdownInfo(expiredDate);
  console.assert(expiredInfo.isExpired === true, 'Expired date test failed');

  // 3. Code Generator Tests
  const code1 = generateRegistrationCode();
  const code2 = generateRegistrationCode();
  console.assert(/^CEA-2026-[2-9A-Z]{6}$/.test(code1), `Code generator test failed format: ${code1}`);
  console.assert(code1 !== code2, 'Code generator test failed uniqueness');

  console.log('✅ ALL UNIT TESTS PASSED SUCCESSFULLY!');
}

// Auto run when executed via tsx
if (import.meta.url.endsWith('utils.test.ts') || process.argv[1]?.includes('utils.test.ts')) {
  runUnitTests();
}
