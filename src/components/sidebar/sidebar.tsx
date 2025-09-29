import { auth } from '@/auth';
import { AppSidebar } from './app-sidebar';

const defaultUser = {
  name: 'Usuario',
  image: '/logo.png',
  email: 'usuario@ipls-lasalle.org',
  role: 'docente',
};

export async function SideBar() {
  const session = await auth();
  const user = session?.user;

  return <AppSidebar user={user ?? defaultUser} />;
}
