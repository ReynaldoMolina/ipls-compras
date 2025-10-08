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
          <div className="flex flex-col gap-5 items-center justify-center p-5 md:p-10">
            <h1 className="text-3xl font-bold text-center lg:text-left max-w-100">
              Gestión de{' '}
              <span className="text-blue-600 dark:text-blue-400">compras</span>{' '}
              y{' '}
              <span className="text-blue-600 dark:text-blue-400">
                proveedores
              </span>
            </h1>
            <h2 className="text-sm text-center lg:text-left text-pretty">
              Organiza tus compras, proveedores y órdenes todo en un solo lugar.
            </h2>
            <div className="inline-flex flex-col sm:flex-row gap-2 w-full items-center justify-center lg:justify-start">
              <Button className="w-fit" asChild>
                <Link href="/solicitudes/nuevo">Crear solicitud</Link>
              </Button>
              <Button className="w-fit" variant="secondary" asChild>
                <Link href="/solicitudes/">Ver mis solicitudes</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Image
              src="/delivery.png"
              className="max-w-100 w-full"
              width={800}
              height={589}
              alt="People delivering a package"
            />
          </div>
        </div>
      </section>
    </>
  );
}
