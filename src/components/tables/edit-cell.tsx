import { CellContext } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Check, Pencil, X } from 'lucide-react';
import { EditedRows } from '@/types/types';

export default function EditCell<TData, TValue>({
  row,
  table,
}: CellContext<TData, TValue>) {
  const meta = table.options.meta;

  function setEditedRows(e: React.MouseEvent<HTMLButtonElement>) {
    const elName = e.currentTarget.name;
    console.log(elName);

    meta?.setEditedRows?.((old: EditedRows) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  }

  return meta?.editedRows?.[row.id] ? (
    <div className="inline-flex gap-1">
      <Button
        variant="outline"
        className="bg-destructive/10 hover:bg-destructive/15"
        size="table"
        name="cancel"
        title="Cancelar"
        onClick={setEditedRows}
      >
        <X className="size-3" />
      </Button>
      <Button
        variant="outline"
        className="bg-date-active/40 hover:bg-date-active"
        size="table"
        name="done"
        title="Guardar"
        onClick={setEditedRows}
      >
        <Check className="size-3" />
      </Button>
    </div>
  ) : (
    <Button
      variant="outline"
      size="table"
      name="edit"
      onClick={setEditedRows}
      title="Editar"
    >
      <Pencil className="size-3" />
    </Button>
  );
}
