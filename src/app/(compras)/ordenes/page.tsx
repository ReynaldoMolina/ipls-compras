import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props) {
  const params = await props.searchParams;
  return (
    <>
      <Header title="Órdenes de compra" />
      <PageWrapper>
        <ActionBar allowNew={false}></ActionBar>
      </PageWrapper>
    </>
  );
}
