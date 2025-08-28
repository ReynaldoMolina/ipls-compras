export default function TableCell({
  children,
  textAlign = 'left',
}: {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
}) {
  const alignments = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  return (
    <div
      className={`flex ${alignments[textAlign]} text-xs whitespace-nowrap pl-1`}
    >
      {children}
    </div>
  );
}
