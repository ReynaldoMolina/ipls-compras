import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { Input } from '../ui/input';

interface TableActionsProps<TData> {
  table: Table<TData>;
}

export function TableNewRow<TData>({ table }: TableActionsProps<TData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [newRow, setNewRow] = useState({
    id_solicitud: 1,
    producto_servicio: '',
    cantidad: 1,
    id_unidad_medida: 1,
    precio: 0,
    observaciones: '',
    prioridad: '',
    id_estado: null,
    comprado: 0,
    recibido: 0,
    precio_compra: 0,
    entrega_bodega: 0,
    precio_bodega: 0,
    id_ubicacion: null,
    id_categoria: 1,
  });
  const meta = table.options.meta;

  if (isEditing)
    return (
      <div className="flex gap-2 rounded-md border">
        <Input
          value={newRow.producto_servicio}
          onChange={(event) =>
            setNewRow({ ...newRow, producto_servicio: event?.target.value })
          }
        />
        <Button variant="outline" onClick={() => meta?.addRow?.(newRow)}>
          Crear
        </Button>
      </div>
    );

  return (
    <Button
      variant="outline"
      className="font-normal justify-start"
      // onClick={() => meta?.addRow?.(1)}
      onClick={() => setIsEditing(true)}
    >
      <Plus className="size-4" />
      Agregar
    </Button>
  );
}

export function TableOptions<TData>({ table }: TableActionsProps<TData>) {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.index);

  function removeRows() {
    meta?.removeSelectedRows?.(selectedRows);
    table.resetRowSelection();
  }

  if (selectedRows.length <= 0) return null;

  return (
    <div className="flex bg-muted bottom-2 gap-2 w-fit rounded-md border p-1 mx-auto">
      <div className="inline-flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="py-1 h-full"
          onClick={() => table.resetRowSelection()}
        >
          <X className="size-4" />
        </Button>
        <span className="text-xs">{`${selectedRows.length} seleccionado(s)`}</span>
      </div>
      <div className="h-full w-0.5 bg-border"></div>
      <Button
        variant="destructive"
        className="font-normal sticky bottom-0 rounded"
        onClick={removeRows}
        size="sm"
      >
        <Trash2 className="size-3.5" />
        Eliminar
      </Button>
    </div>
  );
}
