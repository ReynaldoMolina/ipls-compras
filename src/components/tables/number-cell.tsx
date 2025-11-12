import { formatNumber } from '@/lib/formatters';
import { CellContext } from '@tanstack/react-table';
import { CircleAlert } from 'lucide-react';
import { ToolTip } from '../tooltip';
import { TooltipTrigger } from '../ui/tooltip';

export function NumberIntegerCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;
  const isZero = value === 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} ${isZero && 'text-muted-foreground'} block w-full text-center`}
    >
      {isZero ? '-' : value}
    </span>
  );
}

export function NumberFloatCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;
  const isZero = value === 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} ${isZero && 'text-muted-foreground'} block w-full text-right`}
    >
      {isZero ? '-' : formatNumber(value)}
    </span>
  );
}

export function NumberFloatCellOrdenWithWarning<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const rawValue = getValue() as number | null;
  const value = rawValue ?? 0;
  const isZero = value === 0;

  return (
    <span
      className={`${value < 0 && 'text-destructive'} ${isZero && 'text-muted-foreground'} inline-flex items-center gap-2 w-full justify-end`}
    >
      {value >= 10000 && (
        <ToolTip label="La orden es mayor a C$10,000">
          <TooltipTrigger asChild>
            <CircleAlert className="size-4.5 text-yellow-500" />
          </TooltipTrigger>
        </ToolTip>
      )}
      {isZero ? '-' : formatNumber(value)}
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
  const isZero = value === 0;

  const alignments = {
    float: 'text-right',
    integer: 'text-center',
  };

  return (
    <span
      className={`${newValue < 0 && 'text-destructive'} ${alignments[type]} ${isZero && 'text-muted-foreground'} block w-full px-1 text-muted-foreground`}
    >
      {isZero ? '-' : type === 'float' ? formatNumber(newValue) : newValue}
    </span>
  );
}
