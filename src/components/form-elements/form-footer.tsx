import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { FormAction } from '@/types/types';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';
import { Spinner } from '../ui/spinner';

interface FormFooterProps {
  action: FormAction;
  label?: string;
  isPending?: boolean;
}

export function FormFooter({
  action,
  label,
  isPending = false,
}: FormFooterProps) {
  const router = useRouter();

  return (
    <CardFooter className="border-t">
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner />
            Procesando
          </>
        ) : label ? (
          label
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
  label?: string;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  isPending: boolean;
}

export function FormFooterDialog({
  action = 'create',
  label,
  setOpen,
  onSubmit,
  isPending,
}: FormFooterDialogProps) {
  return (
    <DialogFooter className="border-t pt-6">
      <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        className="w-25"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner />
            Procesando
          </>
        ) : label ? (
          label
        ) : action === 'create' ? (
          'Crear'
        ) : (
          'Guardar'
        )}
      </Button>
    </DialogFooter>
  );
}
