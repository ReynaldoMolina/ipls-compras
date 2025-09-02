import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { proveedores } from './proveedores';
import { usuarios } from './usuarios';

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
  id_usuario: integer()
    .notNull()
    .references(() => usuarios.id),
});
