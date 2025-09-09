import { ColumnDef } from '@tanstack/react-table';
import { SolicitudDetalle, SelectOptions } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import { Checkbox } from '@/components/ui/checkbox';
import { EditableCell } from '@/components/tables/table-editable-cell';
import DefaultCell from '@/components/tables/default-cell';
import { TableNumberSum } from '@/components/tables/table-number';
import InlineEdit from '@/components/tables/inline-edit';

export function getSolicitudesDetalleColumns(
  unidadesMedida: SelectOptions[],
  estados: SelectOptions[],
  ubicaciones: SelectOptions[],
  categorias: SelectOptions[]
): ColumnDef<SolicitudDetalle>[] {
  return [
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
        <div className="w-full h-full inline-flex justify-center items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'producto_servicio',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Producto / Servicio" />
      ),
      cell: EditableCell,
      meta: {
        type: 'text',
      },
    },
    {
      accessorKey: 'cantidad',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Cantidad" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:integer',
      },
      enableHiding: false,
    },
    {
      accessorKey: 'id_unidad_medida',
      header: ({ column }) => <SortButtonClient column={column} label="U/M" />,
      cell: EditableCell,
      meta: {
        type: 'combobox',
        options: unidadesMedida,
      },
    },
    {
      accessorKey: 'precio',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Precio" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:float',
      },
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
      cell: EditableCell,
      meta: {
        type: 'text',
      },
    },
    {
      accessorKey: 'prioridad',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Prioridad" />
      ),
      cell: EditableCell,
      meta: {
        type: 'select',
        options: [
          {
            value: 'I semestre',
            label: 'I semestre',
          },
          {
            value: 'II semestre',
            label: 'II semestre',
          },
        ],
      },
    },
    {
      accessorKey: 'id_estado',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Estado" />
      ),
      cell: EditableCell,
      meta: {
        type: 'combobox',
        options: estados,
      },
    },
    {
      accessorKey: 'comprado',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Comprado" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:integer',
      },
    },
    {
      accessorKey: 'recibido',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Recibido" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:integer',
      },
    },
    {
      accessorKey: 'precio_compra',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Precio compra" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:float',
      },
    },
    {
      accessorKey: 'entrega_bodega',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Entrega bodega" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:integer',
      },
    },
    {
      accessorKey: 'precio_bodega',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Precio bodega" />
      ),
      cell: EditableCell,
      meta: {
        type: 'number:float',
      },
    },
    {
      accessorKey: 'id_ubicacion',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Ubicación" />
      ),
      cell: EditableCell,
      meta: {
        type: 'combobox',
        options: ubicaciones,
      },
    },
    {
      accessorKey: 'id_categoria',
      header: ({ column }) => (
        <SortButtonClient column={column} label="Categoría" />
      ),
      cell: EditableCell,
      meta: {
        type: 'combobox',
        options: categorias,
      },
    },
  ];
}
