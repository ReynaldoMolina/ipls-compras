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

  // Focus the input when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    if (currentValue !== value) {
      onSave(currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value); // cancel changes
      setEditing(false);
    }
  };

  const alignment = {
    text: '',
    integer: 'text-center',
    float: 'text-right pr-1',
  };

  return editing ? (
    <Input
      ref={inputRef}
      type={type === 'text' ? 'text' : 'number'}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${alignment[type]} w-full h-6 text-[0.7rem] px-1 rounded`}
    />
  ) : (
    <span
      onDoubleClick={() => setEditing(true)}
      className={`${alignment[type]} whitespace-nowrap block w-full py-1`}
      title="Doble click para editar"
    >
      {type === 'float' && typeof currentValue === 'number'
        ? formatter.format(currentValue)
        : currentValue}
    </span>
  );
}
