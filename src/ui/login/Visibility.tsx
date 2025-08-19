import VisibilityIcon from '@/icons/visibility.svg';
import VisibilityOffIcon from '@/icons/visibility-off.svg';
import { Dispatch, SetStateAction } from 'react';

interface VisibilityProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function Visibility({
  isVisible,
  setIsVisible,
}: VisibilityProps) {
  function handleClick() {
    setIsVisible((state) => !state);
  }

  return (
    <button
      type="button"
      className="flex items-center justify-center absolute right-3 cursor-pointer"
      onClick={handleClick}
    >
      {isVisible ? (
        <VisibilityOffIcon className="size-5 dark:hover:text-white hover:text-brand-text" />
      ) : (
        <VisibilityIcon className="size-5 text-input-border dark:hover:text-white hover:text-brand-text" />
      )}
    </button>
  );
}
