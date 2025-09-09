'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SolicitudDetalle } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import { Checkbox } from '@/components/ui/checkbox';
import TableEditableCell from '@/components/tables/table-editable-cell';
import DefaultCell from '@/components/tables/default-cell';
import { TableNumber, TableNumberSum } from '@/components/tables/table-number';

export const columns: ColumnDef<SolicitudDetalle>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'producto_servicio',
    enableResizing: true,
    header: ({ column }) => (
      <SortButtonClient column={column} label="Producto / Servicio" />
    ),
    cell: TableEditableCell,
    meta: {
      type: 'text',
    },
  },
  {
    accessorKey: 'cantidad',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Cantidad" />
    ),
    cell: TableEditableCell,
    meta: {
      type: 'number',
    },
  },
  {
    accessorKey: 'id_unidad_medida',
    header: ({ column }) => <SortButtonClient column={column} label="U/M" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'precio',
    header: ({ column }) => <SortButtonClient column={column} label="Precio" />,
    cell: TableNumber,
  },
  {
    id: 'subtotal',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Subtotal" />
    ),
    cell: ({ row }) => {
      console.log('cant', row.original.cantidad);
      console.log('precio', row.original.precio);
      return (
        <TableNumberSum value={row.original.cantidad * row.original.precio} />
      );
    },
  },
  {
    accessorKey: 'observaciones',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Observaciones" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'prioridad',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Prioridad" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'id_estado',
    header: ({ column }) => <SortButtonClient column={column} label="Estado" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'comprado',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Comprado" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Recibido" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'precio_compra',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Precio compra" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'entrega_bodega',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Entrega bodega" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'precio_bodega',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Precio bodega" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'id_ubicacion',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Ubicación" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'id_categoria',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Categoría" />
    ),
    cell: DefaultCell,
  },
];
