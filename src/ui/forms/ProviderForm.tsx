'use client';

import { useActionState } from 'react';
import { FormProps } from '@/types/types';
import { createProvider, updateProvider } from '@/lib/actions/providers';
import { FormSection } from './inputs/FormSection';
import FormButtons from './inputs/FormButtons';
import InputGroup from './inputs/InputGroup';
import FormTextInput from './inputs/FormInputText';

export default function ProviderForm({ action, data, id }: FormProps) {
  const newAction =
    action === 'create' ? createProvider : updateProvider.bind(null, id);
  const [state, formAction, isPending] = useActionState(newAction, {
    message: '',
  });

  return (
    <form action={formAction} className="flex flex-col gap-8 max-w-4xl">
      <div className="flex flex-col gap-8 px-4">
        <FormSection name="info">
          <FormTextInput
            label="Nombre comercial"
            name="nombre_comercial"
            placeHolder="Nombre"
            value={data?.nombre_comercial || ''}
            required={true}
          />
          <InputGroup>
            <FormTextInput
              label="Razón social"
              name="razon_social"
              placeHolder="Razón social"
              value={data?.razon_social || ''}
              required={true}
            />
            <FormTextInput
              label="RUC"
              name="ruc"
              placeHolder="RUC"
              value={data?.ruc || ''}
              required={true}
            />
          </InputGroup>
        </FormSection>
        <FormSection name="contact">
          <InputGroup>
            <FormTextInput
              label="Contacto principal"
              name="nombre_contacto"
              placeHolder="Nombre"
              value={data?.contacto_principal || ''}
            />
            <FormTextInput
              label="Teléfono"
              name="telefono"
              placeHolder="Teléfono"
              value={data?.telefono || ''}
            />
          </InputGroup>
          <InputGroup>
            <FormTextInput
              label="Correo"
              name="correo"
              placeHolder="Correo"
              value={data?.correo || ''}
            />
            <FormTextInput
              label="Departamento"
              name="departamento"
              placeHolder="Departamento"
              value={data?.departamento || ''}
            />
          </InputGroup>
          <FormTextInput
            label="Dirección"
            name="direccion"
            placeHolder="Dirección"
            value={data?.direccion || ''}
          />
        </FormSection>
        <FormSection name="category">
          <InputGroup>
            <FormTextInput
              label="Sector"
              name="sector"
              placeHolder="Sector"
              value={data?.sector || ''}
            />
            <FormTextInput
              label="Subsector"
              name="subsector"
              placeHolder="Subsector"
              value={data?.subsector || ''}
            />
          </InputGroup>
        </FormSection>
      </div>
      <FormButtons isNew={action === 'create'} isPending={isPending} />
    </form>
  );
}
