import { type ChartConfig } from '@/components/ui/chart';

export const comparisonChartConfig = {
  presupuesto: {
    label: 'Presupuestado',
    color: 'var(--chart-1)',
  },
  asignado: {
    label: 'Asignado',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export const presupuestoChartConfig = {
  presupuesto: {
    label: 'Presupuestado',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;
