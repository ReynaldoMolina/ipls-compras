import { FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type TextAreaProps = {
  value: number | string | null | undefined;
  label: string;
};

export function FormTextAreaReadOnly({ value, label }: TextAreaProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Textarea
        defaultValue={value ?? 'Vacío'}
        className="overflow-y-auto"
        disabled
      />
    </FormItem>
  );
}
