import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const ubicacion = pgTable('ubicacion', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
