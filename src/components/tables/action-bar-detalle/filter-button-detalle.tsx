import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export function FilterButtonDetalle() {
  return (
    <Button variant="outline" disabled>
      <Filter />
      <span className="hidden sm:flex">Filtrar</span>
    </Button>
  );
}
