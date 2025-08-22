import Header from '@/ui/header/Header';
import ActionBar from '@/ui/actionbar/ActionBar';
import TableProviders from '@/ui/tables/TableProviders';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props) {
  const params = await props.searchParams;
  return (
    <>
      <Header title="Proveedores" />
      <ActionBar />
      <TableProviders params={params} />
    </>
  );
}
