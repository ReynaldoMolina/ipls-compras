import Header from '@/ui/header/Header';
import ProviderForm from '@/ui/forms/ProviderForm';

export const metadata = {
  title: 'Nuevo proveedor',
};

export default function Page() {
  return (
    <>
      <Header title="Nuevo proveedor" />
      <ProviderForm action="create" />
    </>
  );
}
