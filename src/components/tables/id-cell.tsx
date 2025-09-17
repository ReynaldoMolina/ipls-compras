import { CellContext } from '@tanstack/react-table';

export default function IdCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();

  return (
    <span className="whitespace-nowrap block w-full text-center cursor-default">
      {value !== null && value !== undefined ? String(value) : ''}
    </span>
  );
}
