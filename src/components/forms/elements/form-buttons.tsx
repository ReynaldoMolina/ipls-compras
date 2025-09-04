import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FormButtons({ action }: { action: 'create' | 'edit' }) {
  const router = useRouter();
  return (
    <>
      <Button
        type="button"
        className="text-xs"
        variant="secondary"
        onClick={() => router.back()}
      >
        Cancelar
      </Button>
      <Button type="submit" className="text-xs">
        {action === 'create' ? 'Crear' : 'Guardar'}
      </Button>
    </>
  );
}
