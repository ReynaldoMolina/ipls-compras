import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const entidad_academica = pgTable('entidad_academica', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
  tipo: text().notNull(),
  abreviacion: text().notNull(),
});
