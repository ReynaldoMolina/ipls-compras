import PageTitle from '@/ui/pagetitle/PageTitle';
import ActionBar from '@/ui/actionbar/ActionBar';

const title = 'Resumen';

export const metadata = {
  title: title,
};

export default async function Page() {
  // const params = await props.searchParams;
  return (
    <>
      <PageTitle title={title} />
      <ActionBar allowSearch={false} allowNew={false} />
      <div className="flex flex-col lg:flex-row gap-3 grow">
        <div className="flex items-center justify-center bg-brand-border rounded w-full h-100">
          Graph 1
        </div>
        <div className="flex items-center justify-center bg-brand-border rounded w-full h-100">
          Graph 1
        </div>
      </div>
    </>
  );
}
