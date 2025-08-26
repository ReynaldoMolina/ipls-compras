import { SearchParamsProps } from '@/types/types';
import { AnyColumn, ilike, or } from 'drizzle-orm';

export function buildSearchFilter(
  params: SearchParamsProps,
  searchFields: AnyColumn[]
) {
  const search: string = params?.search?.trim() || '';

  if (!search) return undefined;

  return or(...searchFields.map((field) => ilike(field, `%${search}%`)));
}
