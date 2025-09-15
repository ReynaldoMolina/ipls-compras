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
      className={`${
        value ? 'bg-date-active' : 'bg-date-warning'
      } inline-flex gap-1 p-1 rounded cursor-default`}
    >
      {value ? <Check className="size-4" /> : <XIcon className="size-4" />}
      {value ? 'Activo' : 'Inactivo'}
    </span>
  );
}
