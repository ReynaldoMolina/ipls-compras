import ProviderForm from '@/ui/forms/ProviderForm';
import { getProviderById } from '@/lib/data/providers';
import { EditPageProps } from '@/types/types';
import PageTitle from '@/ui/pagetitle/PageTitle';

export async function generateMetadata(props: EditPageProps) {
  const { id } = props.params;
  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page(props: EditPageProps) {
  const id = Number(props.params.id);
  const data = await getProviderById(id);

  return (
    <>
      <PageTitle title={`Proveedor ${id}`} showBackIcon={true} />
      <ProviderForm action="edit" data={data} id={id} />
    </>
  );
}
