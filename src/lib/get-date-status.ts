import { DateStatus } from '@/types/types';

export function getDateStatus(date: string | null | undefined): DateStatus {
  if (!date) return 'empty';

  const [year, month, day] = date.split('-').map(Number);
  const expiration = new Date(year, month - 1, day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expiration.setHours(0, 0, 0, 0);

  // Compare the dates
  if (today.getTime() < expiration.getTime()) return 'active';
  if (today.getTime() === expiration.getTime()) return 'due';
  return 'expired';
}

export function getSemestreFromDate(date: string | null | undefined): string {
  if (!date) return '';

  const [year, month, day] = date.split('-').map(Number);
  const d = new Date(year, month - 1, day);

  const monthIndex = d.getMonth(); // 0 = January, 6 = July, 11 = December

  if (monthIndex >= 0 && monthIndex <= 6) {
    // January (0) to July (6)
    return 'I semestre';
  } else {
    // August (7) to December (11)
    return 'II semestre';
  }
}
