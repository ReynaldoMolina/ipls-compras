export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col flex-1 p-3 gap-3">{children}</section>
  );
}
