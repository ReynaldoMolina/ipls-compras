import Header from '@/ui/header/Header';
import ActionBar from '@/ui/actions/ActionBar';
import { PageId } from '@/types/types';
import { getPageInfo } from '@/lib/getPageInfo';
import TableProviders from '@/ui/tables/Table';
import { providers } from '@/ui/tables/testData';

const pageId: PageId = 'proveedores';
const pageInfo = getPageInfo(pageId);

export const metadata = {
  title: pageInfo.name,
};

export default function Page() {
  return (
    <>
      <Header pageTitle={pageInfo.name} />
      <ActionBar pageInfo={pageInfo} />
      <TableProviders data={providers} />
    </>
  );
}
