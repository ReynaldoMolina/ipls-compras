import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { NuevoPresupuestoForm } from '@/components/forms/presupuesto/nuevo';

export const metadata = {
  title: 'Nuevo presupuesto',
};

export default async function Page() {
  const entidadesAcademicas = await getEntidadesAcademicas({
    tipo: 'especialidad',
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
