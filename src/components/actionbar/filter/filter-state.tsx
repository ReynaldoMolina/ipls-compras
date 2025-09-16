import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useUrlParams } from '@/hooks/useUrlParams';
import { SelectOptions } from '@/types/types';

export function FilterState({
  label,
  states = [],
  paramKey,
  pageKey,
}: {
  label: string;
  states?: SelectOptions[];
  paramKey: string;
  pageKey: string;
}) {
  const { getParam, setParam } = useUrlParams(pageKey);
  const activeStates = getParam(paramKey);

  function toggle(state: string) {
    const newStates = activeStates.includes(state)
      ? activeStates.filter((s) => s !== state)
      : [...activeStates, state];

    setParam(paramKey, newStates);
  }

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-sm">{label}</DropdownMenuLabel>
      <Separator className="mb-1" />
      {states.map((state) => {
        const isActive = activeStates.includes(String(state.value));
        return (
          <DropdownMenuCheckboxItem
            key={state.value}
            checked={isActive}
            onCheckedChange={() => toggle(String(state.value))}
          >
            <span className="text-sm">{state.label}</span>
          </DropdownMenuCheckboxItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
