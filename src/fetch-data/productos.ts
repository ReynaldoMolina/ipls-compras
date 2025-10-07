import { db } from '@/database/db';
import { ProductosFormType, SearchParamsProps } from '@/types/types';
import { eq, and } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { productos } from '@/database/schema/productos';
import { unidades_medida } from '@/database/schema/unidades-medida';

export async function getProductosTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: productos.id,
    nombre_producto: productos.nombre_producto,
    unidad_medida: unidades_medida.unidad_medida,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    productos.nombre_producto,
  ]);

  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(productos)
      .leftJoin(
        unidades_medida,
        eq(productos.id_unidad_medida, unidades_medida.id)
      )
      .where(and(filterBySearch))
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los productos, por favor intenta de nuevo.'
    );
  }
}

export async function getProductById(
  id: number | string | undefined
): Promise<ProductosFormType> {
  try {
    const data = await db
      .select()
      .from(productos)
      .where(eq(productos.id, Number(id)));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener los productos, por favor intenta de nuevo'
    );
  }
}
