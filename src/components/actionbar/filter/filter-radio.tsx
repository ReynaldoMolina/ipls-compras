import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useUrlParams } from '@/hooks/use-url-params';
import { SelectOptions } from '@/types/types';

export function FilterRadio({
  label,
  options = [],
  paramKey,
}: {
  label: string;
  options?: SelectOptions[];
  paramKey: string;
}) {
  const { getParam, setRadioParam } = useUrlParams();
  const activeState = getParam(paramKey)[0] ?? null;

  function select(option: string) {
    setRadioParam(paramKey, option);
  }

  return (
    <DropdownMenuRadioGroup value={activeState} onValueChange={select}>
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {options.map((option) => {
        return (
          <DropdownMenuRadioItem key={option.value} value={option.value}>
            {option.label}
          </DropdownMenuRadioItem>
        );
      })}
    </DropdownMenuRadioGroup>
  );
}
