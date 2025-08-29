import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useUrlParams } from '@/hooks/useUrlParams';

export function FilterState({
  label,
  states,
  paramKey,
  pageKey,
}: {
  label: string;
  states: (string | null)[];
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
      <DropdownMenuLabel className="text-xs">{label}</DropdownMenuLabel>
      <Separator className="mb-1" />
      {states
        .filter((s): s is string => s !== null)
        .map((state) => {
          const isActive = activeStates.includes(state);
          return (
            <DropdownMenuCheckboxItem
              key={state}
              checked={isActive}
              onCheckedChange={() => toggle(state)}
            >
              <span className="text-xs">{state}</span>
            </DropdownMenuCheckboxItem>
          );
        })}
    </DropdownMenuGroup>
  );
}
