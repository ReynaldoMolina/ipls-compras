import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';

export function OptionsButton() {
  return (
    <Button variant="outline" onClick={() => alert('Opciones')}>
      <EllipsisVertical />
      <span className="hidden sm:flex">Opciones</span>
    </Button>
  );
}
