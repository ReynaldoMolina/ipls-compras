import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { sectores } from './sectores';

export const subsectores = pgTable('subsectores', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  subsector: text().notNull(),
  id_sector: integer()
    .notNull()
    .references(() => sectores.id),
});
