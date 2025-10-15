import { integer, pgTable, real, serial, text } from 'drizzle-orm/pg-core';
import { solicitud } from './solicitud';
import { presupuesto_detalle } from './presupuesto-detalle';

export const solicitud_detalle = pgTable('solicitud_detalle', {
  id: serial().notNull().primaryKey(),
  id_solicitud: integer()
    .notNull()
    .references(() => solicitud.id),
  producto_servicio: text().notNull(),
  cantidad: real().notNull(),
  unidad_medida: text().notNull(),
  observacion: text(),
  id_presupuesto_detalle: integer().references(() => presupuesto_detalle.id),
});
