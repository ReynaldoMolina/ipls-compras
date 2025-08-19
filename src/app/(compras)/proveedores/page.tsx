import Header from '@/ui/header/Header';

const pageTitle: string = 'Proveedores';

export const metadata = {
  title: pageTitle,
};

export default function Page() {
  return (
    <section className="flex grow">
      <Header pageTitle={pageTitle} />
    </section>
  );
}
