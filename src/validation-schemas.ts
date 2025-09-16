import { z } from 'zod';

export const providerSchema = z.object({
  nombre_comercial: z.string().min(1, 'Requerido'),
  razon_social: z.string().nullable(),
  ruc: z.string().nullable(),
  contacto_principal: z.string().nullable(),
  telefono: z.string().nullable(),
  correo: z.string().nullable(),
  id_departamento: z.number().min(1, 'Requerido'),
  direccion: z.string().nullable(),
  id_sector: z.number().min(1, 'Requerido').nullable(),
  id_subsector: z.number().min(1, 'Requerido').nullable(),
});

export const solvenciaSchema = z.object({
  id_proveedor: z.number().min(1),
  emitida: z.string().nullable(),
  vence: z.string().nullable(),
  verificado: z.string('Requerido'),
  recibido: z.string().nullable(),
  url: z.string().nullable(),
  id_usuario: z.number(),
});

export const usuarioSchema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().min(1, 'Requerido'),
  correo: z.email('Ingresa un correo válido'),
  rol: z.string('Requerido'),
  activo: z.boolean('Requerido'),
});

export const loginSchema = z.object({
  correo: z.email('Ingresa un correo válido'),
  password: z.string().min(1, 'Ingresa una contraseña'),
});

export const solicitudSchema = z.object({
  fecha: z.string('Requerido'),
  id_entidad_academica: z.number().min(1, 'Requerido'),
  year: z.number().min(1, 'Requerido'),
  id_usuario: z.number().min(1, 'Requerido'),
  revisado_bodega: z.boolean().nullable(),
});
