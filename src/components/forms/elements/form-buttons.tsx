import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FormButtons({
  action,
  allowCancel = true,
}: {
  action: 'create' | 'edit';
  allowCancel?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex gap-3 justify-end">
      {allowCancel && (
        <Button
          type="button"
          className="text-xs"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
      )}
      <Button type="submit" className="text-xs">
        {action === 'create' ? 'Crear' : 'Guardar'}
      </Button>
    </div>
  );
}
