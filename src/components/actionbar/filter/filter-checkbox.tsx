import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useUrlParams } from '@/hooks/use-url-params';
import { SelectOptions } from '@/types/types';

export function FilterCheckBox({
  label,
  options = [],
  paramKey,
}: {
  label: string;
  options?: SelectOptions[];
  paramKey: string;
}) {
  const { getParam, setCheckBoxParam } = useUrlParams();
  const activeStates = getParam(paramKey);

  function toggle(state: string) {
    const newStates = activeStates.includes(state)
      ? activeStates.filter((s) => s !== state)
      : [...activeStates, state];

    setCheckBoxParam(paramKey, newStates);
  }

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {options.map((option) => {
        const isActive = activeStates.includes(String(option.value));
        return (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={isActive}
            onCheckedChange={() => toggle(String(option.value))}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
