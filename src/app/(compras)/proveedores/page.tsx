import { ActionBar } from '@/components/actionbar/action-bar';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import {
  getProveedoresTableData,
  getUniqueDepartamentosFromProveedores,
} from '@/fetch-data/proveedor';
import { FilterButton } from '@/components/actionbar/filter-button';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { PageProps } from '@/types/types';
import { getUserAndPermissions } from '@/permissions/get-user-and-permissions';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page({ searchParams }: PageProps) {
  const { userPermissions } = await getUserAndPermissions();

  if (userPermissions.cannot('read', 'Proveedor')) notFound();

  const proveedoresTableData = await getProveedoresTableData(
    await searchParams
  );
  const departamentos = await getUniqueDepartamentosFromProveedores();

  return (
    <>
      <Header title="Proveedores" showBackIcon={false} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ departamentos }} />
        </ActionBar>
        <DataTable columns={columns} data={proveedoresTableData} />
      </PageWrapper>
    </>
  );
}
