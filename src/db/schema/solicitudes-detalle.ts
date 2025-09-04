import { integer, pgTable, real, text } from 'drizzle-orm/pg-core';
import { unidades_medida } from './unidades-medida';
import { ubicaciones } from './ubicaciones';

export const solicitudes_detalle = pgTable('solicitudes_detalle', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  producto_servicio: text(),
  cantidad: real(),
  unidad_medida: integer()
    .notNull()
    .references(() => unidades_medida.id),
  precio: real(),
  observaciones: text(),
  prioridad: text(),
  estado: text(),
  comprado: real(),
  recibido: real(),
  precio_compra: real(),
  entrega_bodega: real(),
  precio_bodega: real(),
  ubicado_en: integer()
    .notNull()
    .references(() => ubicaciones.id),
});
