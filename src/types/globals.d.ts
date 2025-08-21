import postgres from 'postgres';

declare global {
  var _sql: postgres.Sql | undefined;
}
