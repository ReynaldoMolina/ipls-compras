import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { NuevaSolicitudForm } from '@/components/forms/solicitud/nuevo';

export const metadata = {
  title: 'Nueva solicitud',
};

export default async function Page() {
  const entidadesAcademicas = await getEntidadesAcademicas({
    tipo: 'especialidad',
  });

  return (
    <>
      <Header title="Nueva solicitud" />
      <PageWrapper>
        <NuevaSolicitudForm selectOptions={{ entidadesAcademicas }} />
      </PageWrapper>
    </>
  );
}
