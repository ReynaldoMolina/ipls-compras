export default function InputGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">{children}</div>
  );
}
