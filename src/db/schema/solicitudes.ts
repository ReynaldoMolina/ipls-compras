import { boolean, date, integer, pgTable } from 'drizzle-orm/pg-core';
import { entidades_academicas } from './entidades-academicas';
import { usuarios } from './usuarios';

export const solicitudes = pgTable('solicitudes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date().notNull(),
  year: integer().notNull(),
  id_entidad_academica: integer()
    .notNull()
    .references(() => entidades_academicas.id),
  id_usuario: integer()
    .notNull()
    .references(() => usuarios.id),
  revisado_bodega: boolean(),
});
