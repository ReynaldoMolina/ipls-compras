import { CellContext } from '@tanstack/react-table';

const formatter = new Intl.NumberFormat('es-NI', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function TableNumber<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} block w-full text-right`}
    >
      {formatter.format(value)}
    </span>
  );
}

export function TableNumberSum({ value }: { value: number }) {
  let newValue = value ?? 0;
  if (isNaN(newValue)) {
    newValue = 0;
  }

  return (
    <span
      className={`${newValue < 0 && 'text-destructive'} block w-full text-right`}
    >
      {formatter.format(newValue)}
    </span>
  );
}
