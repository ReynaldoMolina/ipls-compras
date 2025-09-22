import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const sectores = pgTable('sectores', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sector: text().notNull(),
});
