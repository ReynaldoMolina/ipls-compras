import FormTitle from '@/components/forms/elements/form-title';
import { UserForm } from '@/components/forms/usuarios';
import { getUserById } from '@/lib/data/usuarios';
import { EditPageProps } from '@/types/types';

export async function generateMetadata(props: EditPageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Usuario ${id}`,
  };
}

type Props = {
  params?: {
    id: string;
  };
  searchParams?: {
    sector?: string;
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const id = Number(params?.id);
  const user = await getUserById(id);

  return (
    <>
      <FormTitle title={`Usuario ${id}`} />
      <UserForm action="edit" user={user} />
    </>
  );
}
