import SideMenu from '@/ui/sidemenu/SideMenu';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen bg-red-950">
      <SideMenu />
      {children}
    </main>
  );
}
