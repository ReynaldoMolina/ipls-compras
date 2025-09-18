import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

export function EditCellDialog({ id }: { id: number | undefined }) {
  return (
    <Button variant="outline" size="table" onClick={() => alert(id)}>
      <Pencil className="size-3.5" />
    </Button>
  );
}
