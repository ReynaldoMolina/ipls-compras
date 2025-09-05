export default function FormHeaderDiv({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col space-y-1.5">{children}</div>;
}
