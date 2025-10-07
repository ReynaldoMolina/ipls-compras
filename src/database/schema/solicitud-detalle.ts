import { integer, pgTable, real, text } from 'drizzle-orm/pg-core';
import { unidad_medida } from './unidad-medida';
import { solicitud } from './solicitud';

export const solicitud_detalle = pgTable('solicitud_detalle', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_solicitud: integer()
    .notNull()
    .references(() => solicitud.id),
  producto_servicio: text().notNull(),
  cantidad: real().notNull(),
  id_unidad_medida: integer()
    .notNull()
    .references(() => unidad_medida.id),
  observaciones: text(),
});
