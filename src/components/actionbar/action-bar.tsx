import SearchInput from './search-input';
import NewButton from './new-button';

interface ActionBarProps {
  children: React.ReactNode;
  allowSearch?: boolean;
  allowNew?: boolean;
}

export default function ActionBar({
  children,
  allowSearch = true,
  allowNew = true,
}: ActionBarProps) {
  return (
    <div
      className={`flex items-center ${allowSearch ? 'justify-between' : 'justify-end'} gap-2`}
    >
      {allowSearch && <SearchInput />}
      <div className="flex gap-2">
        {children}
        {allowNew && <NewButton />}
      </div>
    </div>
  );
}
