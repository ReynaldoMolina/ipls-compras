'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrdenModal } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { CheckBoxCell } from '@/components/tables/checkbox-cell';

export const columns: ColumnDef<OrdenModal>[] = [
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
    accessorKey: 'id_solicitud',
    header: 'Solicitud',
    cell: IdCell,
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: DefaultCell,
  },
];
