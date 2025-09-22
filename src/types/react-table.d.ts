import type { TableMeta } from '@tanstack/react-table';
import { DetalleSelectOptions } from './types';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    selectOptions: DetalleSelectOptions;
    id_solicitud: number;
  }

  // interface ColumnMeta<TData extends RowData, TValue> {
  //   type?:
  //     | 'text'
  //     | 'integer'
  //     | 'float'
  //     | 'select'
  //     | 'boolean'
  //     | 'date'
  //     | 'combobox';
  // }
}
