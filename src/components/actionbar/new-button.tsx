import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function NewButton({
  variant = 'default',
}: {
  variant?: 'default' | 'ordenes';
}) {
  const label = variant === 'ordenes' ? 'Añadir bien o servicio' : 'Nuevo';

  return (
    <Button>
      <Plus />
      <span className="hidden md:flex text-xs">{label}</span>
    </Button>
  );
}
