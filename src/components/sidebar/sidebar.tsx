import { auth } from '@/auth';
import { AppSidebar } from './app-sidebar';
import { User } from 'next-auth';

const defaultUser: User = {
  id: '',
  name: 'Usuario',
  image: '/logo.png',
  email: 'usuario@ipls-lasalle.org',
  role: 'docente',
  activo: false,
};

export async function SideBar() {
  const session = await auth();
  const user = session?.user;

  return <AppSidebar user={user ?? defaultUser} />;
}
