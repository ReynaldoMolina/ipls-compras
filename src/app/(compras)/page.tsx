import { Header } from '@/components/header/header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  return (
    <>
      <Header title="Inicio" showBackIcon={false} />
      <section className="flex flex-1 flex-col p-3 gap-3 overflow-y-auto items-center justify-center">
        <div className="grid lg:grid-cols-2 max-w-4xl">
          <div className="flex flex-col gap-5 items-center justify-center p-10">
            <h1 className="text-3xl font-bold text-center md:text-left">
              Gestión de{' '}
              <span className="text-blue-600 dark:text-blue-400">compras</span>{' '}
              y{' '}
              <span className="text-blue-600 dark:text-blue-400">
                proveedores
              </span>
            </h1>
            <h2 className="text-sm text-center md:text-left">
              Organiza tus compras, proveedores y órdenes todo en un solo lugar.
            </h2>
            <div className="inline-flex w-full justify-center lg:justify-start">
              <Button asChild>
                <Link href="/solicitudes/nuevo">Crear solicitud</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/delivery.png"
              width={500}
              height={395}
              alt="People delivering a package"
            />
          </div>
        </div>
      </section>
    </>
  );
}
