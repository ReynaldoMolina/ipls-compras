import { Header } from '@/components/header/header';
import { Button } from '@/components/ui/button';
import { getUserAndPermissions } from '@/permissions/get-user-and-permissions';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  const { userPermissions } = await getUserAndPermissions();
  const canReadProveedor = userPermissions.can('read', 'Proveedor');
  const canReadOrden = userPermissions.can('read', 'Orden');
  const cannotManageSolicitud = userPermissions.cannot('manage', 'Solicitud');

  const title = `Organiza tus compras${canReadProveedor ? ', proveedores' : ''} ${canReadOrden ? 'y órdenes todo' : ''} en un solo lugar.`;

  return (
    <>
      <Header title="Inicio" showBackIcon={false} />
      <section className="flex flex-1 flex-col p-3 gap-3 overflow-y-auto items-center justify-center">
        <div className="grid lg:grid-cols-2 max-w-4xl">
          <div className="flex flex-col gap-5 items-center justify-center p-5 md:p-10">
            <h1 className="w-full text-3xl font-bold text-center lg:text-left">
              Gestión de{' '}
              <span className="text-blue-600 dark:text-blue-400">compras</span>
            </h1>
            <h2 className="w-full text-sm text-center lg:text-left text-pretty">
              {title}
            </h2>
            <div className="inline-flex flex-col sm:flex-row gap-2 w-full items-center justify-center lg:justify-start">
              <Button className="w-40" variant="secondary" asChild>
                <Link href="/solicitudes/">{`Ver ${cannotManageSolicitud ? 'mis' : ''} solicitudes`}</Link>
              </Button>
              <Button className="w-40" asChild>
                <Link href="/solicitudes/nuevo">Crear una solicitud</Link>
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
