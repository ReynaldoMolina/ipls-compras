import postgres from 'postgres';

const SQL_OPTIONS = {
  ssl: (process.env.NODE_ENV === 'production' ? 'require' : false) as
    | 'require'
    | false,
  max: 10,
  idle_timeout: 30,
  max_lifetime: 60 * 60,
};

if (!globalThis._sql) {
  globalThis._sql = postgres(process.env.POSTGRES_URL as string, SQL_OPTIONS);
}

const sql = globalThis._sql;

export { sql };
