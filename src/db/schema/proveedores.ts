import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const proveedores = pgTable('proveedores', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre_comercial: text().notNull(),
  razon_social: text().notNull(),
  ruc: text().notNull(),
  contacto_principal: text(),
  telefono: text(),
  correo: text(),
  departamento: text(),
  direccion: text(),
  sector: text(),
  subsector: text(),
});
