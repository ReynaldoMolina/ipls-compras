import { CellContext } from '@tanstack/react-table';

export function DefaultCellWrap<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();

  return (
    <span className="block w-full md:max-w-md xl:max-w-xl 2xl:max-w-7xl min-w-xs whitespace-pre-wrap break-words text-left">
      {value !== null && value !== undefined ? String(value) : ''}
    </span>
  );
}
