import { CellContext } from '@tanstack/react-table';

export const formatter = new Intl.NumberFormat('es-NI', {
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

export function TableNumberSum({
  value,
  type = 'float',
}: {
  value: number;
  type?: 'integer' | 'float';
}) {
  let newValue = value ?? 0;
  if (isNaN(newValue)) {
    newValue = 0;
  }

  const alignments = {
    float: 'text-right',
    integer: 'text-center',
  };

  return (
    <span
      className={`${newValue < 0 && 'text-destructive'} ${alignments[type]} block w-full px-1 text-muted-foreground`}
    >
      {type === 'float' ? formatter.format(newValue) : newValue}
    </span>
  );
}
