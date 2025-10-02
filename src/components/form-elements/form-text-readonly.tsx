import { FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type TextFieldProps = {
  value: number | string | null | undefined;
  label: string;
  type?: 'text' | 'number';
};

export default function FormTextReadOnly({
  value,
  label,
  type = 'text',
}: TextFieldProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Input type={type} defaultValue={value ?? 'Vacío'} disabled />
    </FormItem>
  );
}
