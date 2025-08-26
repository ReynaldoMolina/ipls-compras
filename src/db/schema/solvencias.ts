import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { proveedores } from './proveedores';

export const solvencias = pgTable('solvencias', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_proveedor: integer()
    .notNull()
    .references(() => proveedores.id),
  emitida: date().notNull(),
  vence: date().notNull(),
  verificado: date(),
  recibido: date(),
  url: text(),
});
