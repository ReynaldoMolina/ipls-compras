'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PresupuestoDetalleTable } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import {
  NumberIntegerCell,
  NumberFloatCell,
  NumberCellWithValue,
} from '@/components/tables/number-cell';
import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/tables/checkbox-cell';
import { sumColumn } from '@/lib/sum-column';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';

export const columns: ColumnDef<PresupuestoDetalleTable>[] = [
  {
    id: 'select',
    header: CheckBoxCellHeader,
    cell: CheckBoxCell,
    enableSorting: false,
    size: 30,
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <EditCell
        href={`/presupuestos/${row.original.id_presupuesto}/detalle/${row.original.id}`}
      />
    ),
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
    accessorKey: 'unidad_medida',
    header: 'U/M',
    cell: DefaultCell,
    size: 60,
  },
  {
    accessorKey: 'precio_sugerido',
    header: 'Precio sugerido',
    cell: NumberFloatCell,
    size: 70,
  },
  {
    id: 'subtotal',
    header: 'Subtotal',
    cell: ({ row }) => (
      <NumberCellWithValue
        value={row.original.cantidad * row.original.precio_sugerido}
      />
    ),
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => {
        const cantidad = Number(row.getValue('cantidad')) || 0;
        const precio = Number(row.getValue('precio_sugerido')) || 0;
        return sum + cantidad * precio;
      }, 0);

      return <NumberCellWithValue value={total} />;
    },
    size: 130,
  },
  {
    accessorKey: 'observaciones',
    header: 'Observaciones',
    cell: DefaultCell,
  },
];
