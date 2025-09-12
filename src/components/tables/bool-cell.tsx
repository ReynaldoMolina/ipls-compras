import { Check, XIcon } from 'lucide-react';

export default function TableBool({ value }: { value: boolean | null }) {
  if (value === null) {
    return (
      <span className="flex items-center gap-1 p-1 rounded bg-gray-200 text-gray-600">
        <XIcon className="size-4" />
        N/A
      </span>
    );
  }

  return (
    <span
      className={`inline-flex gap-1 p-1 rounded ${
        value ? 'bg-date-active' : 'bg-date-warning'
      }`}
    >
      {value ? <Check className="size-4" /> : <XIcon className="size-4" />}
      {value ? 'Activo' : 'Inactivo'}
    </span>
  );
}
