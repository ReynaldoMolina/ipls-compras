import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const entidades_academicas = pgTable('entidades_academicas', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
  tipo: text().notNull(),
  abreviacion: text().notNull(),
});
