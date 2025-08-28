import ArrowDownAlt from '@/icons/arrow_downward_alt.svg';
import { useSortParams } from '../hooks/useSetSort';

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
    <div className="flex gap-2 items-center">
      <span className="text-xs">{label}</span>
      <button
        type="button"
        className={`rounded hover:bg-button-hover cursor-pointer ${active ? 'text-brand-primary' : ''}`}
        onClick={() => setSort(fieldName)}
      >
        <ArrowDownAlt
          className={`${active ? '' : 'opacity-40'} ${active && direction === 'desc' ? '' : 'rotate-180'} size-4`}
        />
      </button>
    </div>
  );
}
