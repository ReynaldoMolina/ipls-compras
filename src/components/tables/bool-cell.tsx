import { Check, XIcon } from 'lucide-react';
import { Badge } from '../ui/badge';

const iconStyle = 'size-3.5';

export default function TableBool({ value }: { value: boolean | null }) {
  if (value === null) {
    return (
      <Badge variant="outline" className="inline-flex gap-1">
        <XIcon className={iconStyle} />
        N/A
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`${
        value ? 'bg-date-active' : 'bg-date-warning'
      } inline-flex gap-1 cursor-default font-normal`}
    >
      {value ? (
        <Check className={iconStyle} />
      ) : (
        <XIcon className={iconStyle} />
      )}
      {value ? 'Activo' : 'Inactivo'}
    </Badge>
  );
}
