import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const ubicaciones = pgTable('ubicaciones', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ubicacion: text().notNull(),
});
