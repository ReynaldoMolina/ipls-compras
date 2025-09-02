import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { SolvenciaForm } from '../solvencias';

export function SolvenciaDialog({ id_proveedor }: { id_proveedor: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs h-7" variant="outline">
          <Pencil className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>Editar solvencia</DialogTitle>
          <DialogDescription>
            Haz cambios a la solvencia, luego click en guardar cuando estés
            listo.
          </DialogDescription>
        </DialogHeader>
        <SolvenciaForm action="edit" id_proveedor={id_proveedor} />
      </DialogContent>
    </Dialog>
  );
}
