import Header from '@/ui/header/Header';
import { MenusProvider } from '@/ui/header/MenusContext';
import SideMenu from '@/ui/sidemenu/SideMenu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen max-h-screen max-w-screen">
      <MenusProvider>
        <Header />
        <section className="flex grow overflow-hidden">
          <SideMenu />
          <section className="flex flex-col gap-3 grow min-w-0 p-3 overflow-y-scroll">
            {children}
          </section>
        </section>
      </MenusProvider>
    </main>
  );
}
