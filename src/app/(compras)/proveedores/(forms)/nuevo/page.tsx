import ProviderForm from '@/ui/forms/ProviderForm';
import PageTitle from '@/ui/pagetitle/PageTitle';

export const metadata = {
  title: 'Nuevo proveedor',
};

export default function Page() {
  return (
    <>
      <PageTitle title="Nuevo proveedor" showBackIcon={true} />
      <ProviderForm action="create" />
    </>
  );
}
