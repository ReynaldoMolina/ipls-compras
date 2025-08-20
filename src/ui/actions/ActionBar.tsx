import SearchInput from './SearchInput';
import FilterButton from './FilterButton';
import NewButton from './NewButton';
import { MenuOption } from '../sidemenu/menuOptions';

export default function ActionBar({ pageInfo }: { pageInfo: MenuOption }) {
  return (
    <div className="flex items-center justify-between px-3">
      <SearchInput />
      <div className="flex gap-2">
        <FilterButton pageInfo={pageInfo} />
        <NewButton pageInfo={pageInfo} />
      </div>
    </div>
  );
}
