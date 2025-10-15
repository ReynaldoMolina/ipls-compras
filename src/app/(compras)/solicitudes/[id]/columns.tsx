'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SolicitudDetalleTable } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import {
  NumberIntegerCell,
  NumberCellWithValue,
} from '@/components/tables/number-cell';
import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/tables/checkbox-cell';
import { sumColumn } from '@/lib/sum-column';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';

export const columns: ColumnDef<SolicitudDetalleTable>[] = [
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
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => {
      const disabled = row.original.restante < 1;
      return (
        <EditCell
          href={`/solicitudes/${row.original.id_solicitud}/detalle/${row.original.id}`}
          disabled={disabled}
        />
      );
    },
    size: 40,
  },
  {
    id: 'item',
    header: ({ column }) => <SortButtonClient column={column} label="Nº" />,
    cell: ({ row }) => (
      <span className="block w-full text-center">{row.index + 1}</span>
    ),
    size: 30,
  },
  {
    accessorKey: 'producto_servicio',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Producto / servicio" />
    ),
    cell: DefaultCell,
    footer: 'Totales',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cant',
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'cantidad');
      return <NumberCellWithValue value={total} type="integer" />;
    },
    size: 50,
  },
  {
    accessorKey: 'en_orden',
    header: 'En orden',
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'en_orden');
      return <NumberCellWithValue value={total} type="integer" />;
    },
    size: 80,
  },
  {
    accessorKey: 'cantidad_bodega',
    header: 'Bodega',
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'cantidad_bodega');
      return <NumberCellWithValue value={total} type="integer" />;
    },
    size: 80,
  },
  {
    accessorKey: 'restante',
    header: 'Restante',
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'restante');
      return <NumberCellWithValue value={total} type="integer" />;
    },
    size: 80,
  },
  {
    accessorKey: 'unidad_medida',
    header: 'U/M',
    cell: DefaultCell,
    size: 60,
  },
  {
    accessorKey: 'observacion',
    header: 'Observación',
    cell: DefaultCell,
    size: 200,
  },
];
