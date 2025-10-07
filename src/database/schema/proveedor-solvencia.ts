import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { proveedor } from './proveedor';
import { users } from './user';

export const proveedor_solvencia = pgTable('proveedor_solvencia', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_proveedor: integer()
    .notNull()
    .references(() => proveedor.id),
  emitida: date(),
  vence: date(),
  verificado: date().notNull(),
  recibido: date(),
  url: text(),
  id_usuario: text()
    .notNull()
    .references(() => users.id),
});
