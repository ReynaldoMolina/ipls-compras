import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { proveedor_sector } from './proveedor-sector';

export const proveedor_subsector = pgTable('proveedor_subsector', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
  id_sector: integer()
    .notNull()
    .references(() => proveedor_sector.id),
});
