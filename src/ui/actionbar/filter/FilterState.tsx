import CheckBoxIcon from '@/icons/check_box.svg';
import CheckBoxBlankIcon from '@/icons//check_box_outline_blank.svg';
import { useState } from 'react';

export function FilterState({
  label,
  states,
}: {
  label: string;
  states: string[];
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-xs font-semibold">{label}</p>
      <div className="flex gap-1">
        {states.map((state) => (
          <StateItem key={state} state={state} />
        ))}
      </div>
    </div>
  );
}

function StateItem({ state }: { state: string }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className="flex items-center rounded-full px-1.5 py-0.5 border border-brand-border cursor-pointer"
      onClick={() => setIsActive((state) => !state)}
    >
      {isActive ? (
        <CheckBoxIcon className="text-brand-blue-text" />
      ) : (
        <CheckBoxBlankIcon />
      )}
      <p className="text-xs w-max rounded-sm px-1 font-semibold">{state}</p>
    </button>
  );
}
