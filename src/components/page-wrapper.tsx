export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col p-3 gap-3 overflow-y-auto">
      {children}
    </section>
  );
}
