import { z } from 'zod';

export const providerSchema = z.object({
  nombre_comercial: z.string().trim().min(1, 'Requerido'),
  razon_social: z.string().trim().nullable(),
  ruc: z.string().trim().nullable(),
  contacto_principal: z.string().trim().nullable(),
  telefono: z.string().trim().nullable(),
  correo: z.string().trim().nullable(),
  id_departamento: z.number().min(1, 'Requerido'),
  direccion: z.string().trim().nullable(),
  id_sector: z.number().min(1, 'Requerido').nullable(),
  id_subsector: z.number().min(1, 'Requerido').nullable(),
});

export const solvenciaSchema = z.object({
  id_proveedor: z.number().min(1),
  emitida: z.string().nullable(),
  vence: z.string().nullable(),
  verificado: z.string('Requerido'),
  recibido: z.string().nullable(),
  url: z.string().trim().nullable(),
  id_usuario: z.string(),
});

export const usuarioSchema = z.object({
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable(),
  image: z.string(),
  role: z.string().min(1, 'Requerido'),
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
  id_usuario: z.string().min(1, 'Requerido'),
  revisado_bodega: z.boolean().nullable(),
});

export const detalleSolicitudSchema = z.object({
  id_solicitud: z.number().min(1, 'Requerido'),
  producto_servicio: z.string().trim().min(1, 'Requerido'),
  cantidad: z.number().min(1, 'Requerido'),
  id_unidad_medida: z.number().min(1, 'Requerido'),
  precio: z.number().min(1, 'Requerido'),
  observaciones: z.string().trim().nullable(),
  prioridad: z.string().nullable(),
  comprado: z.number().nullable(),
  recibido: z.number().nullable(),
  precio_compra: z.number().nullable(),
  entrega_bodega: z.number().nullable(),
  precio_bodega: z.number().nullable(),
  id_estado: z.number().nullable(),
  id_ubicacion: z.number().nullable(),
  id_categoria: z.number().min(1, 'Requerido'),
});

export const ordenesSchema = z.object({
  id_solicitud: z.number().min(1, 'Requerido'),
  fecha_creacion: z.string('Requerido'),
  fecha_a_utilizar: z.string().nullable(),
  id_proveedor: z.number().min(1, 'Requerido'),
  id_estado: z.number().min(1, 'Requerido'),
  numero_cotizacion: z.string().trim().nullable(),
  termino_de_pago: z.string().nullable(),
  moneda: z.string().nullable(),
  observaciones: z.string().trim().nullable(),
});

export const detalleOrdenSchema = z.object({
  id_orden: z.number().min(1, 'Requerido'),
  id_solicitud_detalle: z.number().min(1, 'Requerido'),
  cantidad: z.number().min(1, 'Requerido'),
  precio_real: z.number().min(1, 'Requerido'),
  observaciones: z.string().trim().nullable(),
});
