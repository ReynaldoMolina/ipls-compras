import { SolicitudForm } from '@/components/forms/solicitudes';
import { getEntidadesAcademicas } from '@/fetch-data/form-elements';
import { PageProps } from '@/types/types';
import { getSolicitudById } from '@/fetch-data/solicitudes';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { years } from '@/components/actionbar/filter/filter-states-data';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Solicitud ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id = Number(params?.id);
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
