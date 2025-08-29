import { z } from 'zod';

export const providerSchema = z.object({
  nombre_comercial: z.string().nonempty('Requerido'),
  razon_social: z.string(),
  ruc: z.string(),
  contacto_principal: z.string(),
  telefono: z.string(),
  correo: z.email('Ingresa un correo válido').optional(),
  departamento: z.string('Requerido'),
  direccion: z.string(),
  sector: z.string('Requerido'),
  subsector: z.string('Requerido'),
});
