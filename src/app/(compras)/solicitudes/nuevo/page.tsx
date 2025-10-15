import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { NuevaSolicitudForm } from '@/components/forms/solicitud/nuevo';
import { getSolicitudEstados } from '@/fetch-data/solicitud';

export const metadata = {
  title: 'Nueva solicitud',
};

export default async function Page() {
  const entidadesAcademicas = await getEntidadesAcademicas({
    tipo: 'especialidad',
  });

  const estadosSolicitud = await getSolicitudEstados();

  return (
    <>
      <Header title="Nueva solicitud" />
      <PageWrapper>
        <NuevaSolicitudForm
          selectOptions={{ entidadesAcademicas, estadosSolicitud }}
        />
      </PageWrapper>
    </>
  );
}
