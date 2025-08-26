import SearchInput from './SearchInput';
import FilterButton from './FilterButton';
import NewButton from './NewButton';

export default function ActionBar() {
  return (
    <div className="flex items-center justify-between gap-2">
      <SearchInput />
      <div className="flex gap-2">
        <FilterButton />
        <NewButton />
      </div>
    </div>
  );
}
