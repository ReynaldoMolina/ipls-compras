import Header from '@/ui/header/Header';
import ActionBar from '@/ui/actions/ActionBar';
import { PageId } from '@/types/types';
import { getPageInfo } from '@/lib/getPageInfo';
import TableProviders from '@/ui/tables/Table';
// import { providers } from '@/lib/testData';
import { getProviders } from '@/lib/database/data';

const pageId: PageId = 'proveedores';
const pageInfo = getPageInfo(pageId);

export const metadata = {
  title: pageInfo.name,
};

export default async function Page() {
  const data = await getProviders();

  return (
    <>
      <Header pageTitle={pageInfo.name} />
      <ActionBar pageInfo={pageInfo} />
      <TableProviders data={data} pageId={pageInfo.id} />
    </>
  );
}
