import { ActionBar } from '@/components/actionbar/action-bar';
import { Header } from '@/components//header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import { PageProps } from '@/types/types';
import { FilterButton } from '@/components/actionbar/filter-button';
import {
  getSolicitudesTableData,
  getSolicitudEstados,
  getUniqueYearsFromSolicitudes,
} from '@/fetch-data/solicitud';

const title = 'Solicitudes de compra';

export const metadata = {
  title: title,
};

export default async function Page({ searchParams }: PageProps) {
  const tableData = await getSolicitudesTableData(await searchParams);
  const years = await getUniqueYearsFromSolicitudes();
  const solicitudEstados = await getSolicitudEstados();

  return (
    <>
      <Header title={title} showBackIcon={false} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ years, solicitudEstados }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
