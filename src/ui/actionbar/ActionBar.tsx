import SearchInput from './SearchInput';
import FilterButton from './FilterButton';
import NewButton from './NewButton';

interface ActionBarProps {
  allowSearch?: boolean;
  allowNew?: boolean;
}

export default function ActionBar({
  allowSearch = true,
  allowNew = true,
}: ActionBarProps) {
  return (
    <div
      className={`flex items-center ${allowSearch ? 'justify-between' : 'justify-end'} gap-2`}
    >
      {allowSearch && <SearchInput />}
      <div className="flex gap-2">
        <FilterButton />
        {allowNew && <NewButton />}
      </div>
    </div>
  );
}
