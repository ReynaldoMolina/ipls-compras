import { z } from 'zod';

export const zNumberMin = () =>
  z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z.number('Debe ser un número').min(0.01, 'Requerido')
  );

export const zNumberNullable = () =>
  z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z.number('Debe ser un número').nullable()
  );
