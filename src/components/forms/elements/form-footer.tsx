import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { FormAction } from '@/types/types';
import { useRouter } from 'next/navigation';

export default function FormFooter({ action }: { action: FormAction }) {
  const router = useRouter();
  return (
    <CardFooter>
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit">{action === 'create' ? 'Crear' : 'Guardar'}</Button>
    </CardFooter>
  );
}
