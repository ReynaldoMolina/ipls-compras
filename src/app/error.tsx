'use client';

import { Button } from '@/components/ui/button';
import { Frown, House, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center gap-10 h-screen">
      <div className="flex flex-col items-center gap-2 max-w-md">
        <Frown className="size-10" />
        <h1 className="font-semibold text-lg">Lo sentimos</h1>
        <span className="text-sm text-muted-foreground text-center text-pretty">
          Ha ocurrido un error inesperado y no hemos podido cargar la
          información.
        </span>
      </div>
      <div className="flex items-center gap-2 max-w-md">
        <Button variant="secondary" onClick={() => reset()} asChild>
          <Link href="/">
            <House />
            Inicio
          </Link>
        </Button>
        <Button onClick={() => reset()}>
          <RotateCcw />
          Reintentar
        </Button>
      </div>
    </section>
  );
}
