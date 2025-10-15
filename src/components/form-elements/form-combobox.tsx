import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ComboBox } from '@/components/combo-box';
import { useUpdateUrlParams } from './update-params';
import { SelectOptions } from '@/types/types';

type FormComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  options: SelectOptions[];
  updateParam?: string;
  resetField?: () => void;
  outPutType?: 'number' | 'string';
};

export function FormCombobox<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  options,
  updateParam,
  resetField,
  outPutType = 'string',
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
              disabled={disabled}
              outPutType={outPutType}
              onParamUpdate={(value: string) => {
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
