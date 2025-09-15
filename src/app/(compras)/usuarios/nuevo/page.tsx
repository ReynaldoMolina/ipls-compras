import FormTitle from '@/components/forms/elements/form-title';
import { UserForm } from '@/components/forms/usuarios';

export const metadata = {
  title: 'Nuevo usuario',
};

export default async function Page() {
  return (
    <>
      <FormTitle title="Nuevo usuario" />
      <UserForm action="create" />
    </>
  );
}
