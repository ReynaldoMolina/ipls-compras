import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { ordenes_estados } from './ordenes-estados';
import { solicitudes } from './solicitudes';
import { proveedores } from './proveedores';

export const ordenes = pgTable('ordenes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_solicitud: integer()
    .notNull()
    .references(() => solicitudes.id),
  fecha_creacion: date().notNull(),
  fecha_a_utilizar: date(),
  id_proveedor: integer().references(() => proveedores.id),
  id_estado: integer().references(() => ordenes_estados.id),
  numero_cotizacion: text(),
  termino_de_pago: text(),
  moneda: text(),
  observaciones: text(),
});
