import { SearchInput } from './search-input';
import { NewButton } from './new-button';

interface ActionBarProps {
  children?: React.ReactNode;
  allowSearch?: boolean;
  allowNew?: boolean;
}

export function ActionBar({
  children,
  allowSearch = true,
  allowNew = true,
}: ActionBarProps) {
  return (
    <div className="inline-flex gap-2">
      {allowSearch && <SearchInput />}
      <div className="inline-flex gap-2">
        {children}
        {allowNew && <NewButton />}
      </div>
    </div>
  );
}
