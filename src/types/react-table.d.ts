import type { ColumnMeta, TableMeta } from '@tanstack/react-table';
import { SolicitudDetalle } from './types';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    editedRows?: Record<string, boolean>;
    setEditedRows?: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    revertData: (rowIndex: number, revert: boolean) => void;
    addRow?: (newRow: SolicitudDetalle) => void;
    removeSelectedRows?: (selectedRows: number[]) => void;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    type?:
      | 'text'
      | 'integer'
      | 'float'
      | 'select'
      | 'boolean'
      | 'date'
      | 'combobox';
    options?: { label: string; value: string | number }[];
    required?: boolean;
  }
}
