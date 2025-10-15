import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { proveedor_sector } from './proveedor-sector';
import { proveedor_subsector } from './proveedor-subsector';

export const proveedor = pgTable('proveedor', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre_comercial: text().notNull(),
  razon_social: text(),
  ruc: text(),
  contacto_principal: text(),
  telefono: text(),
  correo: text(),
  departamento: text().notNull(),
  direccion: text(),
  id_sector: integer().references(() => proveedor_sector.id),
  id_subsector: integer().references(() => proveedor_subsector.id),
});
