import FormBackButton from '@/components/forms/elements/form-back-button';
import { UserForm } from '@/components/forms/usuarios';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

const title = 'Nuevo usuario';

export const metadata = {
  title: title,
};

export default async function Page() {
  return (
    <>
      <Header title={title} />
      <PageWrapper>
        <FormBackButton />
        <UserForm action="create" />
      </PageWrapper>
    </>
  );
}
