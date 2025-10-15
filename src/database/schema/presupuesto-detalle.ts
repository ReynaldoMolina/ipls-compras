import {
  date,
  integer,
  pgTable,
  real,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { presupuesto } from './presupuesto';

export const presupuesto_detalle = pgTable('presupuesto_detalle', {
  id: serial().notNull().primaryKey(),
  id_presupuesto: integer()
    .notNull()
    .references(() => presupuesto.id),
  producto_servicio: text().notNull(),
  cantidad: real().notNull(),
  unidad_medida: text().notNull(),
  precio_sugerido: real().notNull(),
  categoria: text(),
  prioridad: date(),
  observacion: text(),
});
