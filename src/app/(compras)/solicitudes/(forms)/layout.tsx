import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Solicitudes de compra" />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
}
