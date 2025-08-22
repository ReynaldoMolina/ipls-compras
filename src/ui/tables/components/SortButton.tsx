import ArrowDownAlt from '@/icons/arrow_downward_alt.svg';
import { LabelType } from './headerLabels';

type Props = {
  column: LabelType;
  active: boolean;
  direction: 'asc' | 'desc';
  onClick: (col: LabelType) => void;
};

export default function SortButton({
  column,
  active,
  direction,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`rounded hover:bg-button-hover cursor-pointer ${active ? 'text-brand-primary' : ''}`}
      onClick={() => onClick(column)}
    >
      <ArrowDownAlt
        className={`${active ? '' : 'opacity-40'} ${active && direction === 'desc' ? '' : 'rotate-180'} size-4`}
      />
    </button>
  );
}
