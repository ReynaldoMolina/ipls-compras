import { useSortParams } from '../../hooks/use-setSort';
import { ArrowUp } from 'lucide-react';

export default function SortButton({
  fieldName,
  label,
}: {
  fieldName: string;
  label: string;
}) {
  const { orderBy, direction, setSort } = useSortParams();
  const active = orderBy === fieldName;

  return (
    <button
      type="button"
      className="flex gap-2 items-center hover:bg-popover cursor-pointer w-fit rounded p-1"
      onClick={() => setSort(fieldName)}
    >
      <span className="text-xs whitespace-nowrap">{label}</span>
      <ArrowUp
        className={`${active ? '' : 'opacity-30'} ${active && direction === 'desc' ? '' : 'rotate-180'} size-3.5`}
      />
    </button>
  );
}
