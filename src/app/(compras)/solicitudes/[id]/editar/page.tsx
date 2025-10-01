import { SolicitudForm } from '@/components/forms/solicitudes';
import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { PageProps } from '@/types/types';
import { getSolicitudById } from '@/fetch-data/solicitudes';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { years } from '@/components/select-options-data';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Solicitud ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const solicitud = await getSolicitudById(id);
  const entidadesAcademicas = await getEntidadesAcademicas();

  return (
    <>
      <Header title={`Solicitud ${id}`} />
      <PageWrapper>
        <SolicitudForm
          action="edit"
          solicitud={solicitud}
          entidadesAcademicas={entidadesAcademicas}
          years={years}
        />
      </PageWrapper>
    </>
  );
}
