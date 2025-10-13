import { integer, pgTable, real, text } from 'drizzle-orm/pg-core';
import { solicitud } from './solicitud';
import { unidad_medida } from './unidad-medida';
import { presupuesto_detalle } from './presupuesto-detalle';

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
  observacion: text(),
  id_presupuesto_detalle: integer().references(() => presupuesto_detalle.id),
});
