import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { SelectOptions } from '@/types/types';

interface SelectProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  options: SelectOptions[];
}

export default function FormSelect<T extends FieldValues>({
  field,
  options,
}: SelectProps<T>) {
  console.log(field.value);

  return (
    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una opción" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
