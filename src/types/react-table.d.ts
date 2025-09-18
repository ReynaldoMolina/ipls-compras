import type { ColumnMeta, TableMeta } from '@tanstack/react-table';
import { SelectOptions, SolicitudDetalle } from './types';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    // buckets
    newRows?: TData[];
    editedRows?: TData[];
    deletedRows?: TData[];

    // setters
    setNewRows?: React.Dispatch<React.SetStateAction<TData[]>>;
    setEditedRows?: React.Dispatch<React.SetStateAction<TData[]>>;
    setDeletedRows?: React.Dispatch<React.SetStateAction<TData[]>>;

    // helpers
    // addRow: (newRow: TData) => void;
    // updateRow: (
    //   rowIndex: number,
    //   columnId: keyof TData,
    //   value: unknown
    // ) => void;
    // deleteRows: (rows: TData[]) => void;
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
    options?: SelectOptions[];
  }
}
