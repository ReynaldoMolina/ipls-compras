import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const cursos_carreras_areas = pgTable('cursos_carreras_areas', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text(),
  tipo: text(),
});
