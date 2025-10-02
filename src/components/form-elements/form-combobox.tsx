import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ComboBox } from '@/components/combo-box';
import { ComboBoxData } from '@/types/types';
import { useUpdateUrlParams } from './update-params';

type FormComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: ComboBoxData;
  updateParam?: string;
  resetField?: () => void;
};

export function FormCombobox<T extends FieldValues>({
  control,
  name,
  label,
  options,
  updateParam,
  resetField,
}: FormComboboxProps<T>) {
  const setUrlParam = useUpdateUrlParams();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ComboBox
              options={options}
              value={field.value}
              onChange={field.onChange}
              onParamUpdate={(value) => {
                if (updateParam && resetField) {
                  setUrlParam(updateParam, value);
                  resetField();
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
