import { DetalleSelectOptions } from './types';
import { Dispatch, SetStateAction } from 'react';

declare module '@tanstack/react-table' {
  interface TableMeta<TModal extends TData> {
    selectOptions?: DetalleSelectOptions | undefined;
    id_solicitud?: number;
    id_orden?: number;
    grouped?: boolean;
    setGrouped?: Dispatch<SetStateAction<boolean>>;
    tableDataModal?: TModal[];
  }
}
