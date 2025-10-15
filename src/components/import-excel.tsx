'use client';

import { importExcel } from '@/server-actions/import-excel';
import { useState } from 'react';
import { useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Import } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { DialogClose } from '@radix-ui/react-dialog';

export function ExcelImportForm({
  id_presupuesto,
}: {
  id_presupuesto: number;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage('Por favor selecciona un archivo de Excel.');

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      try {
        const res = await importExcel(formData, id_presupuesto);
        setMessage(
          `Se ${res.count === 1 ? 'importó' : 'importaron'} ${res.count} ${res.count === 1 ? 'fila' : 'filas'} correctamente.`
        );
      } catch (err) {
        console.error(err);
        setMessage(
          `Hubo un error al importar los datos, revisa que los datos estén correctos e intenta nuevamente.`
        );
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setMessage(null);
        setOpen((state) => !state);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <Import />
          <span className="hidden sm:block">Importar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-6">
          <DialogTitle>Importar productos</DialogTitle>
          <DialogDescription>
            Importa tus productos desde un archivo de Excel y agrégalos al
            sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="excel-file">Seleccionar archivo</Label>
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx, .xls"
              className="min-w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {message && <p className="text-sm">{message}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!file || isPending}>
              {isPending ? 'Importando...' : 'Importar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
