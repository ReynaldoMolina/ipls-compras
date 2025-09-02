import { z } from 'zod';

export const providerSchema = z.object({
  nombre_comercial: z.string().min(1, 'Requerido'),
  razon_social: z.string().optional(),
  ruc: z.string().optional(),
  contacto_principal: z.string().optional(),
  telefono: z.string().optional(),
  correo: z.string().optional(),
  id_departamento: z.number().min(1, 'Requerido'),
  direccion: z.string().optional(),
  id_sector: z.number().min(1, 'Requerido'),
  id_subsector: z.number().min(1, 'Requerido'),
});

export const solvenciaSchema = z.object({
  id_proveedor: z.number().min(1, 'Requerido'),
  emitida: z.date('Requerido'),
  vence: z.date('Requerido'),
  verificado: z.date().optional(),
  recibido: z.date().optional(),
  url: z.string().optional(),
  id_usuario: z.number().optional(),
});
