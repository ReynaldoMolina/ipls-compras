import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { FormAction } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';
import { LoadingIcon } from '../loading/LoadingIcon';

interface FormFooterProps {
  action: FormAction;
  isPending?: boolean;
}

export function FormFooter({ action, isPending = false }: FormFooterProps) {
  const router = useRouter();

  return (
    <CardFooter className="flex gap-2">
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit" className="w-25" disabled={isPending}>
        {isPending ? (
          <LoadingIcon />
        ) : action === 'create' ? (
          'Crear'
        ) : (
          'Guardar'
        )}
      </Button>
    </CardFooter>
  );
}

interface FormFooterDialogProps {
  action?: 'create' | 'add';
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function FormFooterDialog({
  action = 'create',
  setOpen,
}: FormFooterDialogProps) {
  return (
    <DialogFooter>
      <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button type="submit">{action === 'create' ? 'Crear' : 'Agregar'}</Button>
    </DialogFooter>
  );
}
