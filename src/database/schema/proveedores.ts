import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { departamentos } from './departamentos';
import { sectores } from './sectores';
import { subsectores } from './subsectores';

export const proveedores = pgTable('proveedores', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre_comercial: text().notNull(),
  razon_social: text(),
  ruc: text(),
  contacto_principal: text(),
  telefono: text(),
  correo: text(),
  id_departamento: integer()
    .notNull()
    .references(() => departamentos.id),
  direccion: text(),
  id_sector: integer().references(() => sectores.id),
  id_subsector: integer().references(() => subsectores.id),
});
