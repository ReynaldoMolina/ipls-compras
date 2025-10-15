import { z } from 'zod';

export const zNumberMin = () =>
  z.preprocess(
    (value) => (value === '' ? null : Number(value)),
    z.number('Debe ser un número').min(0.01, 'Requerido')
  ) as unknown as z.ZodNumber;

export const zNumberNullable = () =>
  z.preprocess(
    (value) => (value === '' || value === undefined ? null : Number(value)),
    z.number('Debe ser un número').nullable()
  ) as unknown as z.ZodNumber;
