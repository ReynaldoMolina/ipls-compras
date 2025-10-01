import { Button } from '@/components/ui/button';
import { ArrowLeft, Frown } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Cuenta inactiva',
};

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 h-screen">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Frown className="size-10" />
        <h1 className="font-semibold text-lg">Lo sentimos</h1>
        <span className="text-sm text-muted-foreground text-center text-pretty">
          Tu cuenta ha sido desactivada. Si crees que se trata de un error, por
          favor contacta al administrador.
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
