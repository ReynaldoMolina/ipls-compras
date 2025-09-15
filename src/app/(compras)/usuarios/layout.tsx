import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Usuarios" />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
}
