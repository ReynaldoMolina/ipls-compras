import { UserForm } from '@/components/forms/usuarios';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getUserById } from '@/fetch-data/usuarios';
import { PageProps } from '@/types/types';

export async function generateMetadata() {
  return {
    title: `Editar usuario`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  return (
    <>
      <Header title={`Usuario - ${user.name}`} />
      <PageWrapper>
        <UserForm action="edit" user={user} />
      </PageWrapper>
    </>
  );
}
