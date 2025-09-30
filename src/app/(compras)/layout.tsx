import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserProvider } from '@/hooks/use-user';
import { auth } from '@/auth';
import { defaultUser } from '@/permissions/default-user';
import { AppSidebar } from '@/components/sidebar/app-sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const session = await auth();
  const user = session?.user ?? defaultUser;

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
