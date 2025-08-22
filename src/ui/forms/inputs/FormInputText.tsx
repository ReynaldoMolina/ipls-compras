import { useState } from 'react';

interface FormTextInputProps {
  label: string;
  name: string;
  placeHolder: string;
  value: string;
  required?: boolean;
}

export default function FormTextInput({
  label,
  name,
  placeHolder,
  value,
  required = false,
}: FormTextInputProps) {
  const [text, setText] = useState(value || '');

  function handleChange(newText: string) {
    setText(newText);
  }

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label htmlFor={name} className="text-xs">
        {label}{' '}
        <span className="text-brand-red">{required && '(requerido)'}</span>
      </label>
      <input
        className="w-full text-xs h-8 border border-input-border rounded-md px-2"
        type="text"
        placeholder={placeHolder}
        name={name}
        id={name}
        value={text}
        autoComplete="off"
        required={required}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
}
