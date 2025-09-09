import { useSortParams } from '../../hooks/use-setSort';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Column } from '@tanstack/react-table';

interface SortButtonProps<TData, TValue> {
  column: Column<TData, TValue>;
  label: string;
}

const buttonStyle =
  'cursor-pointer w-full has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent';

export function SortButton<TData, TValue>({
  column,
  label,
}: SortButtonProps<TData, TValue>) {
  const { orderBy, direction, setSort } = useSortParams();
  const active = orderBy === column.id;

  return (
    <Button
      variant="ghost"
      className={buttonStyle}
      onClick={() => setSort(column.id)}
    >
      {label}
      <ArrowUp
        className={`${active ? '' : 'opacity-30'} ${active && direction === 'desc' ? '' : 'rotate-180'} ml-auto`}
      />
    </Button>
  );
}

export function SortButtonClient<TData, TValue>({
  column,
  label,
}: SortButtonProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      className={buttonStyle}
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      <ArrowUp
        className={`ml-auto ${column.getIsSorted() === 'desc' ? '' : 'rotate-180'}`}
      />
    </Button>
  );
}
