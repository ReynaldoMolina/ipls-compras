'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PresupuestoModal } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { CheckBoxCell } from '@/components/tables/checkbox-cell';

export const columns: ColumnDef<PresupuestoModal>[] = [
  {
    id: 'select',
    header: '',
    cell: CheckBoxCell,
    enableSorting: false,
    size: 20,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: IdCell,
    size: 50,
  },

  {
    accessorKey: 'entidad_academica',
    header: 'Carrera / curso',
    cell: DefaultCell,
  },
  {
    accessorKey: 'year',
    header: 'Año',
    cell: IdCell,
    size: 70,
  },
];
