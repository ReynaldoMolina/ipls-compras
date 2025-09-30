import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { proveedores } from './proveedores';
import { users } from './usuarios';

export const solvencias = pgTable('solvencias', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_proveedor: integer()
    .notNull()
    .references(() => proveedores.id),
  emitida: date(),
  vence: date(),
  verificado: date().notNull(),
  recibido: date(),
  url: text(),
  id_usuario: text()
    .notNull()
    .references(() => users.id),
});
