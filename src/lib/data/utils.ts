import { sql } from '../db';
import { SearchParamsProps, SortOrder } from '@/types/types';

export function getUrlParams(params: SearchParamsProps) {
  const search: string = params?.search || '';
  const orderBy: string = params?.orderBy || 'id';
  const direction: string = params?.direction || 'asc';
  const orderFragment = sql`${sql(orderBy)} ${direction === 'desc' ? sql`desc` : sql`asc`}`;

  return { search, orderFragment };
}

export function getSearchFragment(searchColumns: string[]) {
  const searchFragment = searchColumns.flatMap((col, i) => [
    i ? sql` || ' ' || ` : sql``,
    sql`${sql(col)}::text`,
  ]);

  return searchFragment;
}
