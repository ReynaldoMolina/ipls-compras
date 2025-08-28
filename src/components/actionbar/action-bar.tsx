import { DialogNewProvider } from '@/app/(compras)/proveedores/form';
import FilterButton from './filter-button';
import SearchInput from './search-input';

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
        {allowNew && <DialogNewProvider />}
      </div>
    </div>
  );
}
