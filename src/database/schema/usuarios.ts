import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usuarios = pgTable('usuarios', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  email: text().unique(),
  emailVerified: timestamp({ mode: 'date' }),
  image: text(),
  role: text().notNull().default('user'),
  activo: boolean().notNull().default(false),
});
