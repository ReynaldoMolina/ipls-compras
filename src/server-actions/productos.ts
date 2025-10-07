'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { ProductoFormType } from '@/types/types';
import { productos } from '@/database/schema/productos';

interface CreateProductoProps {
  values: ProductoFormType;
}

export async function createProducto(
  prevState: unknown,
  data: CreateProductoProps
) {
  try {
    await db.insert(productos).values(data.values);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating producto' };
  }
  await goBackTo('/productos');
}

interface UpdateProductoProps {
  id: number | undefined;
  values: ProductoFormType;
}

export async function updateProducto(
  prevState: unknown,
  data: UpdateProductoProps
) {
  if (!data.id) return;
  try {
    await db
      .update(productos)
      .set(data.values)
      .where(eq(productos.id, Number(data.id)));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/productos');
}
