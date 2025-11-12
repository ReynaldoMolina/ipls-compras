import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { NuevoPresupuestoForm } from '@/components/forms/presupuesto/nuevo';
import { getUserAndPermissions } from '@/permissions/get-user-and-permissions';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Nuevo presupuesto',
};

export default async function Page() {
  const { userPermissions } = await getUserAndPermissions();
  const cannotCreatePresupuesto = userPermissions.cannot(
    'create',
    'Presupuesto'
  );

  if (cannotCreatePresupuesto) return notFound();

  const entidadesAcademicas = await getEntidadesAcademicas({
    area: undefined,
  });

  return (
    <>
      <Header title="Nuevo presupuesto" />
      <PageWrapper>
        <NuevoPresupuestoForm selectOptions={{ entidadesAcademicas }} />
      </PageWrapper>
    </>
  );
}
