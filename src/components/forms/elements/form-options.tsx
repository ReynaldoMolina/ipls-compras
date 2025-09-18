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
import FormDelete from './form-delete';

export default function FormOptions({ action }: { action: FormAction }) {
  if (action !== 'edit') return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" type="button" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <FormDelete />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
