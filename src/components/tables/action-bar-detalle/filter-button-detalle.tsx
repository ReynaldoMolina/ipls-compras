import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export function FilterButtonDetalle() {
  return (
    <Button variant="outline" onClick={() => alert('Filtrar test')}>
      <Filter />
      <span className="hidden sm:flex">Filtrar</span>
    </Button>
  );
}
