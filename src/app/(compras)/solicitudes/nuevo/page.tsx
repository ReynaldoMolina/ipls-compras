import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { NuevaSolicitudForm } from '@/components/forms/solicitud/nuevo';
import { getSolicitudEstados } from '@/fetch-data/solicitud';
import { getPresupuestosModal } from '@/fetch-data/presupuesto';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Nueva solicitud',
};

export default async function Page({ searchParams }: PageProps) {
  const { id_entidad } = await searchParams;
  const entidadesAcademicas = await getEntidadesAcademicas({ area: undefined });

  const estadosSolicitud = await getSolicitudEstados();
  const presupuestosModal = await getPresupuestosModal(id_entidad);

  return (
    <>
      <Header title="Nueva solicitud" />
      <PageWrapper>
        <NuevaSolicitudForm
          selectOptions={{ entidadesAcademicas, estadosSolicitud }}
          presupuestosModal={presupuestosModal}
        />
      </PageWrapper>
    </>
  );
}
