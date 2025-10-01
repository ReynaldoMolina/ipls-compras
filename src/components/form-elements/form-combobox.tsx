import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ComboBox } from '@/components/combo-box';
import { ComboBoxData } from '@/types/types';

type FormComboboxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: ComboBoxData;
  form: UseFormReturn<T>;
  updateParams?: boolean;
  resetOnOptionsChange?: boolean;
};

export default function FormCombobox<T extends FieldValues>({
  name,
  label,
  options,
  form,
  updateParams = false,
  resetOnOptionsChange = false,
}: FormComboboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <ComboBox
            field={field}
            options={options}
            form={form}
            updateParams={updateParams}
            resetOnOptionsChange={resetOnOptionsChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
