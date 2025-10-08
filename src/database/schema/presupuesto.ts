import { integer, pgTable } from 'drizzle-orm/pg-core';
import { entidad_academica } from './entidad-academica';

export const presupuesto = pgTable('presupuesto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  year: integer().notNull(),
  id_entidad_academica: integer()
    .notNull()
    .references(() => entidad_academica.id),
});
