import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserProvider } from '@/hooks/use-user';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { getUserAndPermissions } from '@/permissions/get-user-and-permissions';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const { user } = await getUserAndPermissions();

  return (
    <UserProvider user={user}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="flex flex-col flex-1 overflow-hidden max-h-screen">
          {children}
        </main>
      </SidebarProvider>
    </UserProvider>
  );
}
