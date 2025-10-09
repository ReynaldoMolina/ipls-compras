import { DataTable } from '@/components/tables/data-table';
import { columns } from './columns';
import {
  getSolvenciaProveedorInfoById,
  getSolvenciasByProviderId,
  getUniqueYearsFromSolvencias,
} from '@/fetch-data/proveedor-solvencia';
import { ActionBar } from '@/components/actionbar/action-bar';
import { FilterButton } from '@/components/actionbar/filter-button';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const proveedor = await getSolvenciaProveedorInfoById(id);

  return {
    title: `Solvencias / ${proveedor?.nombre_comercial}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const id_proveedor = (await params).id;
  const proveedor = await getSolvenciaProveedorInfoById(id_proveedor);
  const tableData = await getSolvenciasByProviderId(
    id_proveedor,
    await searchParams
  );
  const years = await getUniqueYearsFromSolvencias();

  return (
    <>
      <Header title={`Solvencias / ${proveedor?.nombre_comercial}`} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ years }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
