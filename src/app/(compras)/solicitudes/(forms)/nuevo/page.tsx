import { years } from '@/components/actionbar/filter/filter-states-data';
import { SolicitudForm } from '@/components/forms/solicitudes';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { getEntidadesAcademicas } from '@/lib/data/form-elements';

const title = 'Nueva solicitud';

export const metadata = {
  title: title,
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
