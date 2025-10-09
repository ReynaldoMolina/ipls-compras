import { ActionBar } from '@/components/actionbar/action-bar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getOrdenesEstados, getOrdenesTableData } from '@/fetch-data/orden';
import { FilterButton } from '@/components/actionbar/filter-button';
import { getUniqueYearsFromPresupuestos } from '@/fetch-data/presupuesto';
import { getUserAndPermissions } from '@/permissions/get-user-and-permissions';
import { notFound } from 'next/navigation';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page({ searchParams }: PageProps) {
  const { ability } = await getUserAndPermissions();

  if (ability.cannot('read', 'Orden')) notFound();

  const tableData = await getOrdenesTableData(await searchParams, undefined);
  const years = await getUniqueYearsFromPresupuestos();
  const ordenState = await getOrdenesEstados();

  return (
    <>
      <Header title="Órdenes de compra" />
      <PageWrapper>
        <ActionBar allowNew={false}>
          <FilterButton filterOptions={{ years, ordenState }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
