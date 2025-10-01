import { Button } from '@/components/ui/button';
import { ArrowLeft, Smile } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Cuenta sin verificar',
};

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 h-screen">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Smile className="size-10" />
        <h1 className="font-semibold text-lg">Verificación en proceso</h1>
        <span className="text-sm text-muted-foreground text-center text-pretty">
          Tu cuenta está pendiente de verificación por parte del administrador.
          Recibirás acceso una vez aprobada.
        </span>
      </div>
      <div className="flex items-center gap-2 max-w-md">
        <Button asChild>
          <Link href="/auth/login">
            <ArrowLeft />
            Regresar
          </Link>
        </Button>
      </div>
    </section>
  );
}
