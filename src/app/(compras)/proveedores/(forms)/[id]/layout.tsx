export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen max-h-screen max-w-screen">
      <section className="flex flex-col gap-3 grow min-w-0">
        {children}
        <p>Tabs</p>
      </section>
    </section>
  );
}
