import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormAction, OrdenPdfProps } from '@/types/types';
import { Download, Ellipsis, Printer } from 'lucide-react';
import FormDelete from '../../actionbar/delete-button';
import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OrdenPdf } from '@/components/order-pdf/order-pdf';
import Link from 'next/link';

interface FormOptionsProps {
  action: FormAction;
  register?: OrdenPdfProps;
}

export default function FormOptions({ action, register }: FormOptionsProps) {
  const [open, setOpen] = useState(false);
  if (action !== 'edit') return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" type="button" size="icon" title="Opciones">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {register && <OrdenOptions register={register} />}
        <FormDelete
          setOpen={setOpen}
          count={1}
          handleDelete={() => alert('borrado test')}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OrdenOptions({ register }: { register: OrdenPdfProps }) {
  console.log(register);

  return (
    <>
      <DropdownMenuItem asChild>
        <Button
          asChild
          variant="ghost"
          size="sm"
          type="button"
          className="w-full justify-start"
        >
          <Link href={`/ordenes/${register.id_orden}/print`}>
            <Printer className="text-foreground" />
            Imprimir
          </Link>
        </Button>
      </DropdownMenuItem>
      <div>
        <PDFDownloadLink
          document={<OrdenPdf register={register} />}
          fileName={`Órden de compra ${register.id_orden}`}
        >
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="w-full justify-start"
          >
            <Download />
            Descargar
          </Button>
        </PDFDownloadLink>
      </div>
    </>
  );
}
