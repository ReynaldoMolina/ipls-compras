import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { ordenes_estados } from './ordenes-estados';
import { solicitudes } from './solicitudes';

export const ordenes = pgTable('ordenes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_solicitud: integer()
    .notNull()
    .references(() => solicitudes.id),
  fecha_creacion: date().notNull(),
  fecha_a_utilizar: date(),
  id_estado: integer().references(() => ordenes_estados.id),
  observaciones: text(),
});
