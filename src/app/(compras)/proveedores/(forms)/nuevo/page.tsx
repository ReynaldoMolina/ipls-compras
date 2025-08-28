import ProviderForm from '@/components/forms/ProviderForm';

export const metadata = {
  title: 'Nuevo proveedor',
};

export default function Page() {
  return (
    <>
      <ProviderForm action="create" />
    </>
  );
}
