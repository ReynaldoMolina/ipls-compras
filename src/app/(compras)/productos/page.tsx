import { ActionBar } from '@/components/actionbar/action-bar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getUserAndPermissions } from '@/permissions/get-user-and-permissions';
import { notFound } from 'next/navigation';
import { getProductosTableData } from '@/fetch-data/productos';

const title = 'Productos';

export const metadata = {
  title: title,
};

export default async function Page({ searchParams }: PageProps) {
  const { ability } = await getUserAndPermissions();

  if (ability.cannot('read', 'Producto')) notFound();

  const tableData = await getProductosTableData(await searchParams);

  return (
    <>
      <Header title="Productos" />
      <PageWrapper>
        <ActionBar />
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
