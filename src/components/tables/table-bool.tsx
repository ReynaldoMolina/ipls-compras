import { Check, XIcon } from 'lucide-react';

export default function TableBool({ value }: { value: boolean | null }) {
  console.log(value);

  const newValue = value === true ? 'Activo' : 'Inactivo';
  const icons = {
    Activo: <Check className="size-4" />,
    Inactivo: <XIcon className="size-4" />,
  };
  return (
    <div
      className={`flex items-center justify-start gap-1 p-1 rounded ${value === true ? 'bg-date-active' : 'bg-date-warning'}`}
    >
      {icons[newValue]}
      {newValue}
    </div>
  );
}
