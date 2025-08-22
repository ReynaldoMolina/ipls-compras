import { useUrlParams } from '@/lib/hooks/useUrlParams';
import CheckBoxBlank from '@/icons/check_box_outline_blank.svg';
import CheckBox from '@/icons/check_box.svg';

export function FilterState({
  label,
  states,
  paramKey,
  pageKey,
}: {
  label: string;
  states: string[];
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
    <div className="flex flex-col gap-2 w-full">
      <p className="text-xs font-semibold">{label}</p>
      <div className="flex gap-1 flex-wrap">
        {states.map((state) => {
          const isActive = activeStates.includes(state);
          return (
            <button
              key={state}
              className={`flex items-center rounded-full px-1.5 py-0.5 border border-input-border cursor-pointer ${
                isActive ? '' : ''
              }`}
              onClick={() => toggle(state)}
            >
              {isActive ? <CheckBox /> : <CheckBoxBlank />}
              <span className="text-xs px-1 font-semibold">{state}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
