import { format, isThisYear, parse } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(date: string | null | undefined) {
  if (!date || date === null) return 'Sin fecha';

  const newDate = parse(date, 'yyyy-MM-dd', new Date());

  if (isThisYear(newDate)) {
    return format(newDate, 'dd MMM', { locale: es });
  }

  return format(newDate, 'dd MMM yyyy', { locale: es });
}
