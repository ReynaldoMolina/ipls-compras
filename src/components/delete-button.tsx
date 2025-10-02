import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash, TriangleAlert } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface DeleteButtonProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  count: number;
  handleDelete: () => void;
  disabled?: boolean;
}

export function DeleteButton({
  setOpen,
  count,
  handleDelete,
  disabled = false,
}: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="w-full justify-start text-destructive hover:text-destructive"
          disabled={disabled}
        >
          <Trash />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="inline-flex gap-2 items-center">
            <TriangleAlert className="size-5" />
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
            {count > 1
              ? ` Se van a eliminar ${count} registros `
              : ` Se va a eliminar el registro `}
            de forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              handleDelete();
            }}
          >
            <Trash />
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
