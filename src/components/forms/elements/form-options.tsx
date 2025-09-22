import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormAction } from '@/types/types';
import { Ellipsis } from 'lucide-react';
import FormDelete from '../../actionbar/delete-button';
import { useState } from 'react';

export default function FormOptions({ action }: { action: FormAction }) {
  const [open, setOpen] = useState(false);
  if (action !== 'edit') return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" type="button" size="icon" title="Opciones">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <FormDelete
          setOpen={setOpen}
          count={1}
          handleDelete={() => alert('borrado test')}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
