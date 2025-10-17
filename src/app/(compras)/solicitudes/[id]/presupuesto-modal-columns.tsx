'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PresupuestoDetalleModal } from '@/types/types';
import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/tables/checkbox-cell';
import { NumberIntegerCell } from '@/components/tables/number-cell';
import { DateStatusCell } from '@/components/tables/date-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { DefaultCellWrap } from '@/components/tables/default-cell-wrap';

export const columns: ColumnDef<PresupuestoDetalleModal>[] = [
  {
    id: 'select',
    header: CheckBoxCellHeader,
    cell: (ctx) => (
      <CheckBoxCell {...ctx} disabled={ctx.row.original.restante < 1} />
    ),
    enableSorting: false,
    size: 30,
  },
  {
    accessorKey: 'producto_servicio',
    header: 'Producto o servicio',
    cell: DefaultCellWrap,
  },
  {
    accessorKey: 'restante',
    header: 'Restante',
    cell: NumberIntegerCell,
    size: 70,
  },
  {
    accessorKey: 'unidad_medida',
    header: 'U/M',
    cell: DefaultCell,
    size: 70,
  },
  {
    accessorKey: 'prioridad',
    header: 'Prioridad',
    cell: DateStatusCell,
    size: 50,
  },
];
