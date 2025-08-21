import ProviderForm from '@/ui/forms/ProviderForm';
import Header from '@/ui/header/Header';

const pageTitle = 'Nuevo proveedor';

export const metadata = {
  title: pageTitle,
};

export default function Page() {
  return (
    <>
      <Header pageTitle={pageTitle} />
      <ProviderForm type="new" />
    </>
  );
}
