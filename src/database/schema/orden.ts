import {
  boolean,
  date,
  integer,
  pgTable,
  real,
  text,
} from 'drizzle-orm/pg-core';
import { solicitud } from './solicitud';
import { proveedor } from './proveedor';
import { orden_estado } from './orden-estado';

export const orden = pgTable('orden', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_solicitud: integer()
    .notNull()
    .references(() => solicitud.id),
  fecha_creacion: date().notNull(),
  fecha_a_utilizar: date(),
  id_proveedor: integer().references(() => proveedor.id),
  id_estado: integer().references(() => orden_estado.id),
  numero_cotizacion: text(),
  termino_de_pago: text(),
  moneda: text(),
  descuento: real(),
  observaciones: text(),
  calcular_iva: boolean().default(false),
});
