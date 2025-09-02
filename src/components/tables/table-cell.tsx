export default function TableCell({
  children,
  textAlign = 'left',
  fullWidth = false,
}: {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  fullWidth?: boolean;
}) {
  const alignments = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  return (
    <div
      className={`flex ${alignments[textAlign]} ${fullWidth ? 'min-w-full' : ''} text-xs whitespace-nowrap pl-1`}
    >
      {children}
    </div>
  );
}
