import PageTitle from '@/ui/pagetitle/PageTitle';
import ActionBar from '@/ui/actionbar/ActionBar';
import TableSolicitudes from '@/ui/tables/TableSolicitudes';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props) {
  const params = await props.searchParams;
  return (
    <>
      <PageTitle title={title} />
      <ActionBar allowNew={false} />
      <TableSolicitudes params={params} />
    </>
  );
}
