import ActionBar from '@/components/actionbar/action-bar';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props) {
  const params = await props.searchParams;
  return (
    <>
      <ActionBar allowNew={false} />
    </>
  );
}
