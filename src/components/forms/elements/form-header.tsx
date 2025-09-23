import { FormAction } from '@/types/types';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function FormHeader({
  children,
  action,
  name,
  noun,
}: {
  children?: React.ReactNode;
  action: FormAction;
  name: string;
  noun: 'm' | 'f';
}) {
  const article = noun === 'm' ? 'del' : 'de la';
  const verb =
    action === 'create' ? (noun === 'm' ? 'Nuevo' : 'Nueva') : 'Editar';
  const instruction = action === 'create' ? 'Ingresa' : 'Edita';
  const button = action === 'create' ? 'crear' : 'guardar';

  return (
    <CardHeader>
      <div className="inline-flex flex-col space-y-1.5">
        <CardTitle>
          {verb} {name}
        </CardTitle>
        <CardDescription>
          {instruction} la información {article} {name}, haz click en {button}{' '}
          cuando estés listo.
        </CardDescription>
      </div>
      {children}
    </CardHeader>
  );
}
