import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(date: string | null | undefined) {
  if (!date || date === null) return 'Sin fecha';
  const newDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(newDate, 'dd/MMM/yyyy', { locale: es });
}

export const formatNumber = new Intl.NumberFormat('es-NI', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;
