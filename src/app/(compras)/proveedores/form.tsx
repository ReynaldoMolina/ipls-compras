import NewButton from '@/components/actionbar/new-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function DialogNewProvider() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <NewButton />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nuevo proveedor</DialogTitle>
            <DialogDescription>
              Agrega los datos del proveedor. Haz click en crear cuando
              termines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre_comercial">Nombre</Label>
              <Input
                id="nombre_comercial"
                name="nombre_comercial"
                defaultValue=""
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="razon_social">Razón social</Label>
              <Input id="razon_social" name="razon_social" defaultValue="" />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Crear</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
