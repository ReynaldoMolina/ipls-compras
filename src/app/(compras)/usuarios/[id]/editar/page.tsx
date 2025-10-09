import { UserForm } from '@/components/forms/usuario';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getUserById, getUserInfoById } from '@/fetch-data/usuario';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserInfoById(id);
  return {
    title: `${user.name}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  return (
    <>
      <Header title={user.name ?? ''} />
      <PageWrapper>
        <UserForm user={user} />
      </PageWrapper>
    </>
  );
}
