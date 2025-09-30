import { auth } from '@/auth';
import { AppSidebar } from './app-sidebar';
import { defaultUser } from '@/permissions/default-user';

export async function SideBar() {
  const session = await auth();
  const user = session?.user;

  return <AppSidebar user={user ?? defaultUser} />;
}
