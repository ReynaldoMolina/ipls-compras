import { formatNumber } from '@/lib/formatters';
import { CellContext } from '@tanstack/react-table';

export function NumberCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} block w-full text-right`}
    >
      {formatNumber(value)}
    </span>
  );
}

export function NumberCellWithValue({
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
      {type === 'float' ? formatNumber(newValue) : newValue}
    </span>
  );
}
