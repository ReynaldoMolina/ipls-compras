import Header from '@/ui/header/Header';
import ActionBar from '@/ui/actionbar/ActionBar';
import TableProviders from '@/ui/tables/TableProviders';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <Header title="Proveedores" />
      <ActionBar />
      <TableProviders params={searchParams} />
    </>
  );
}
