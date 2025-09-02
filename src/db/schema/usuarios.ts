import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';

export const usuarios = pgTable('usuarios', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
  apellido: text().notNull(),
  correo: text().notNull(),
  password: text().notNull(),
  rol: text().notNull(),
  activo: boolean().notNull(),
});
