import { integer, pgTable, real, text } from 'drizzle-orm/pg-core';
import { unidades_medida } from './unidades-medida';
import { ubicaciones } from './ubicaciones';
import { solicitudes_estados } from './solicitudes-estados';
import { solicitudes } from './solicitudes';
import { categoria_productos } from './categoria_productos';

export const solicitudes_detalle = pgTable('solicitudes_detalle', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_solicitud: integer()
    .notNull()
    .references(() => solicitudes.id),
  producto_servicio: text().notNull(),
  cantidad: real().notNull(),
  id_unidad_medida: integer()
    .notNull()
    .references(() => unidades_medida.id),
  precio: real().notNull(),
  observaciones: text(),
  prioridad: text(),
  id_estado: integer().references(() => solicitudes_estados.id),
  comprado: real(),
  recibido: real(),
  precio_compra: real(),
  entrega_bodega: real(),
  precio_bodega: real(),
  id_ubicacion: integer().references(() => ubicaciones.id),
  id_categoria: integer().references(() => categoria_productos.id),
});
