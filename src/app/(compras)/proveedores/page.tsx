import PageTitle from '@/ui/pagetitle/PageTitle';
import ActionBar from '@/ui/actionbar/ActionBar';
import TableProviders from '@/ui/tables/TableProviders';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props) {
  const params = await props.searchParams;
  return (
    <>
      <PageTitle title="Proveedores" />
      <ActionBar />
      <TableProviders params={params} />
    </>
  );
}
