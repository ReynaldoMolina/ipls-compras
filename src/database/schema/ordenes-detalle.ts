import { integer, pgTable, real, serial, text } from 'drizzle-orm/pg-core';
import { ordenes } from './ordenes';
import { solicitudes_detalle } from './solicitudes-detalle';

export const ordenes_detalle = pgTable('ordenes_detalle', {
  id: serial().primaryKey(),
  id_orden: integer()
    .notNull()
    .references(() => ordenes.id),
  id_solicitud_detalle: integer()
    .notNull()
    .references(() => solicitudes_detalle.id),
  cantidad: real().notNull(),
  precio_real: real(),
  observaciones: text(),
});
