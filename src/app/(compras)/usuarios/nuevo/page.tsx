import { UserForm } from '@/components/forms/usuarios';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

export const metadata = {
  title: 'Nuevo usuario',
};

export default async function Page() {
  return (
    <>
      <Header title="Usuarios" />
      <PageWrapper>
        <UserForm action="create" />
      </PageWrapper>
    </>
  );
}
