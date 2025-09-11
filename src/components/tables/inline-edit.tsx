import { useState, useRef, useEffect } from 'react';
import { Input } from '../ui/input';
import { formatter } from './table-number';

interface InlineEditProps {
  value: string | number;
  onSave: (newValue: string | number) => void;
  type?: 'text' | 'integer' | 'float';
}

export default function InlineEdit({
  value,
  onSave,
  type = 'text',
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setEditing(false);
    if (currentValue !== value) {
      onSave(currentValue);
    }

    const nextEl = e.relatedTarget as HTMLElement | null;
    if (!nextEl || !nextEl.closest('button')) {
      buttonRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value); // cancel changes
      setEditing(false);
      buttonRef.current?.focus();
    }
  }

  function handleKeyDownButton(e: React.KeyboardEvent) {
    if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
      setEditing(true);
    }
  }

  const alignment = {
    text: 'text-left',
    integer: 'text-center',
    float: 'text-right pr-1',
  };

  return editing ? (
    <Input
      ref={inputRef}
      type={type === 'text' ? 'text' : 'number'}
      value={currentValue}
      onChange={(e) =>
        setCurrentValue(
          type === 'text' ? e.target.value : e.target.valueAsNumber
        )
      }
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${alignment[type]} w-full h-6 px-1 rounded`}
    />
  ) : (
    <button
      ref={buttonRef}
      type="button"
      onKeyDown={handleKeyDownButton}
      onDoubleClick={() => setEditing(true)}
      className={`${alignment[type]} whitespace-nowrap min-h-6 block w-full p-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500`}
    >
      {typeof currentValue === 'string'
        ? currentValue
        : typeof currentValue === 'number'
          ? currentValue === 0
            ? ''
            : type === 'float'
              ? formatter.format(currentValue)
              : currentValue
          : ''}
    </button>
  );
}
