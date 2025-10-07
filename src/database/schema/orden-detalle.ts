import { integer, pgTable, real, serial, text } from 'drizzle-orm/pg-core';
import { ordenes } from './orden';
import { solicitud_detalle } from './solicitud-detalle';

export const orden_detalle = pgTable('orden_detalle', {
  id: serial().primaryKey(),
  id_orden: integer()
    .notNull()
    .references(() => ordenes.id),
  id_solicitud_detalle: integer()
    .notNull()
    .references(() => solicitud_detalle.id),
  cantidad: real().notNull(),
  precio: real(),
  observaciones: text(),
});
