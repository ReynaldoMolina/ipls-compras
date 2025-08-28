import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from './data-table';
import { getProviders } from '@/lib/data/providers';

const title = 'Proveedores';

export const metadata = {
  title: title,
};

export default async function Page(props) {
  const params = await props.searchParams;
  const data = await getProviders(params);
  return (
    <>
      <Header title={title} />
      <PageWrapper>
        <ActionBar />
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
