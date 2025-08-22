import { PrevState } from '@/types/types';
import { getProviderFormData } from '../formdata/providers';
import { createRecord, goBackTo, updateRecord } from './actionsUtils';

export async function createProvider(prevState: PrevState, formData: FormData) {
  try {
    const data = getProviderFormData(formData);
    await createRecord({ tableName: 'proveedores', data });
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}

export async function updateProvider(
  id: number,
  prevState: PrevState,
  formData: FormData
) {
  try {
    const data = getProviderFormData(formData);
    await updateRecord({ tableName: 'proveedores', data, id });
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}
