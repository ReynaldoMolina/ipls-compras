interface EditableCellProps {
  value: any;
  onChange: (newValue: any) => void;
}

export function EditableCell({ value, onChange }: EditableCellProps) {
  return (
    <input
      className="w-full border rounded px-2 text-xs"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
