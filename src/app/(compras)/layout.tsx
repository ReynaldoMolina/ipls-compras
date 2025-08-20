import SideMenu from '@/ui/sidemenu/SideMenu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen max-h-screen max-w-screen">
      <SideMenu />
      <section className="flex flex-col gap-4 grow min-w-0">{children}</section>
    </main>
  );
}
