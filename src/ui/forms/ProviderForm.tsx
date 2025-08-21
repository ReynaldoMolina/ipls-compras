'use client';

import FormButtons from './inputs/FormButtons';
import FormTextInput from './inputs/FormInputText';
import { FormSection } from './inputs/FormSection';
import InputGroup from './inputs/InputGroup';
import { Provider } from '@/lib/testData';

interface FormProps {
  data?: Provider;
  type: 'new' | 'edit';
}

export default function ProviderForm({ data, type }: FormProps) {
  // function handleSubmit(e) {
  //   e.preventDefault();
  // }

  return (
    <form action="" className="flex flex-col gap-8 max-w-4xl">
      <div className="flex flex-col gap-8 px-4">
        <FormSection name="info">
          <FormTextInput
            label="Nombre comercial"
            name="nombreComercial"
            placeHolder="Nombre"
            value={data?.nombreComercial || ''}
            required={true}
          />
          <InputGroup>
            <FormTextInput
              label="Razón social"
              name="razonSocial"
              placeHolder="Razón social"
              value={data?.razonSocial || ''}
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
              name="contactoPrincipal"
              placeHolder="Nombre"
              value={data?.contacto || ''}
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
              name="dept"
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
      <FormButtons />
    </form>
  );
}
