import Header from '@/ui/header/Header';
import { providers } from '@/lib/testData';
import ProviderForm from '@/ui/forms/ProviderForm';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata(props: PageProps) {
  const { id } = props.params;

  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const params = props.params;
  const id = params.id;
  // const data = await getClientById(id);

  return (
    <>
      <Header pageTitle={`Proveedor ${id}`} />
      <ProviderForm type="edit" data={providers[Number(id) - 1]} />
    </>
  );
}
