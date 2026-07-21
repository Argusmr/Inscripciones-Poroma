import { DEADLINE_DATE_STRING } from '../config';

export interface CountdownInfo {
  daysRemaining: number;
  isToday: boolean;
  isExpired: boolean;
  message: string;
}

export function getCountdownInfo(nowDate: Date = new Date()): CountdownInfo {
  // Target date: August 10, 2026
  const targetYear = 2026;
  const targetMonth = 7; // August (0-indexed in JS Date)
  const targetDay = 10;

  const todayStart = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  const deadlineStart = new Date(targetYear, targetMonth, targetDay);
  
  const diffTime = deadlineStart.getTime() - todayStart.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      daysRemaining: 0,
      isToday: false,
      isExpired: true,
      message: 'Inscripciones finalizadas',
    };
  }

  if (diffDays === 0) {
    return {
      daysRemaining: 0,
      isToday: true,
      isExpired: false,
      message: '¡Hoy es el último día!',
    };
  }

  if (diffDays === 1) {
    return {
      daysRemaining: 1,
      isToday: false,
      isExpired: false,
      message: '¡Te queda 1 día!',
    };
  }

  return {
    daysRemaining: diffDays,
    isToday: false,
    isExpired: false,
    message: `¡Te quedan ${diffDays} días!`,
  };
}
