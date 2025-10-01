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
