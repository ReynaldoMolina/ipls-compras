import type { ColumnMeta, TableMeta } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    type?:
      | 'text'
      | 'number:integer'
      | 'number:float'
      | 'select'
      | 'boolean'
      | 'date'
      | 'combobox';
    options?: { label: string; value: string | number | boolean }[];
  }
}
