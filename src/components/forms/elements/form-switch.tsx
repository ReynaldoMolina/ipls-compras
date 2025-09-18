import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control, FieldValues, Path } from 'react-hook-form';

type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description: string;
};

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <span className="text-sm font-medium">{label}</span>
          <div className="flex flex-row items-center justify-between rounded-md border px-3 py-2 shadow-xs max-h-9">
            <FormLabel>{description}</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
