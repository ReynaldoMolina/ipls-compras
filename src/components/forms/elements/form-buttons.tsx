import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FormButtons({ action }: { action: 'create' | 'edit' }) {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-end">
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit">{action === 'create' ? 'Crear' : 'Guardar'}</Button>
    </div>
  );
}
