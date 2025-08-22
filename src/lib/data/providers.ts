import { sql } from '../db';
import { ProviderTable, SearchParamsProps, SortOrder } from '@/types/types';
import { getSearchFragment, getUrlParams } from './utils';

interface ProvidersFilters {
  solvencia?: string;
  departamento?: string;
}

export async function getProviders(params: SearchParamsProps) {
  const { search, orderFragment } = getUrlParams(params);

  const searchColumns = [
    'nombre_comercial',
    'razon_social',
    'ruc',
    'telefono',
    'departamento',
    'correo',
  ];

  const searchFragment = getSearchFragment(searchColumns);

  try {
    const data = await sql<ProviderTable[]>`
      select
        id,
        nombre_comercial,
        razon_social,
        ruc,
        telefono,
        departamento,
        correo
      from
        proveedores
      where ${searchFragment} ilike ${`%${search}%`}
      order by ${orderFragment}
    `;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los proveedores, por favor intenta de nuevo.'
    );
  }
}

export async function getProviderById(id: number) {
  try {
    const data = await sql`
      select * from "proveedores"
      where "id" = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el proveedor, por favor intenta de nuevo'
    );
  }
}
