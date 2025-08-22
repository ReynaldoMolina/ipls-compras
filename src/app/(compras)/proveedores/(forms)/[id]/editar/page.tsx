import Header from '@/ui/header/Header';
import ProviderForm from '@/ui/forms/ProviderForm';
import { getProviderById } from '@/lib/data/providers';

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
  const id = Number(params.id);
  const data = await getProviderById(id);

  return (
    <>
      <Header title={`Proveedor ${id}`} />
      <ProviderForm action="edit" data={data} id={id} />
    </>
  );
}
