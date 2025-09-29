import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SideBar } from '@/components/sidebar/sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SideBar />
      <main className="flex flex-col flex-1 overflow-hidden max-h-screen">
        {children}
      </main>
    </SidebarProvider>
  );
}
