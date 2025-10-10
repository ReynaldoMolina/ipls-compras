import { Button } from '@/components/ui/button';
import { ArrowLeft, Frown } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Página no disponible',
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 h-screen">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Frown className="size-10" />
        <h1 className="font-semibold text-lg">Error 404</h1>
        <p className="font-semibold text-lg">
          La página no se encuentra disponible.
        </p>
        <span className="text-sm text-muted-foreground text-center text-pretty">
          Es posible que el enlace esté roto o haya sido eliminado. Vuelve al
          inicio para continuar navegando.
        </span>
      </div>
      <div className="flex items-center gap-2 max-w-md">
        <Button asChild>
          <Link href="/">
            <ArrowLeft />
            Ir a inicio
          </Link>
        </Button>
      </div>
    </section>
  );
}
