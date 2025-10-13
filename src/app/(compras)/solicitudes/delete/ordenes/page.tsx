import { ActionBar } from '@/components/actionbar/action-bar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { getOrdenesEstados, getOrdenesTableData } from '@/fetch-data/orden';
import { FilterButton } from '@/components/actionbar/filter-button';
import { getUniqueYearsFromSolicitudes } from '@/fetch-data/presupuesto';
import { columns } from '@/app/(compras)/ordenes/columns';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Solicitud ${id} - Órdenes de compra`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tableData = await getOrdenesTableData(await searchParams, id);
  const years = await getUniqueYearsFromSolicitudes();
  const ordenesStates = await getOrdenesEstados();

  return (
    <>
      <Header title={`Solicitud ${id} - Órdenes de compra`} />
      <PageWrapper>
        <ActionBar allowNew={false}>
          <FilterButton filterOptions={{ years, ordenesStates }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
