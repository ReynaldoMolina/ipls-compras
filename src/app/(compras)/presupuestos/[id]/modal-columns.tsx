'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SolicitudesTableModal } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { CheckBoxCell } from '@/components/tables/checkbox-cell';
import { DateStatusCell } from '@/components/tables/date-cell';

export const columns: ColumnDef<SolicitudesTableModal>[] = [
  {
    id: 'select',
    header: '',
    cell: CheckBoxCell,
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: IdCell,
  },

  {
    accessorKey: 'entidad_academica',
    header: 'Carrera / curso / área',
    cell: DefaultCell,
  },
  {
    accessorKey: 'fecha_a_utilizar',
    header: 'Fecha a utilizar',
    cell: DateStatusCell,
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: DefaultCell,
  },
];
