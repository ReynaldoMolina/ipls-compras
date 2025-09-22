import { SolicitudForm } from '@/components/forms/solicitudes';
import { getEntidadesAcademicas } from '@/fetch-data/form-elements';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { years } from '@/components/actionbar/filter/filter-states-data';

export const metadata = {
  title: 'Nueva solicitud',
};

export default async function Page() {
  const entidadesAcademicas = await getEntidadesAcademicas();

  return (
    <>
      <Header title="Nueva solicitud" />
      <PageWrapper>
        <SolicitudForm
          action="create"
          entidadesAcademicas={entidadesAcademicas}
          years={years}
        />
      </PageWrapper>
    </>
  );
}
