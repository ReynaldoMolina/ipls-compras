import { Table } from '@tanstack/react-table';

export function sumColumn<TData>(
  table: Table<TData>,
  columnKey: keyof TData
): number {
  return table.getFilteredRowModel().rows.reduce((sum, row) => {
    const value = row.getValue(columnKey as string);
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
}
