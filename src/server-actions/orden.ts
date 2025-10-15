'use server';

import { db } from '@/database/db';
import { OrdenDetalleFormType, OrdenFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { orden } from '@/database/schema/orden';
import { createOrdenDetalleBySelectedRows } from './orden-detalle';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

interface CreateOrden {
  values: OrdenFormType;
}

export async function createOrden(prevState: unknown, data: CreateOrden) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(orden)
      .values(data.values)
      .returning({ id: orden.id });
    return {
      ...stateCreateSuccess,
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateOrden {
  id: number | string | undefined;
  values: OrdenFormType;
}

export async function updateOrden(prevState: unknown, data: UpdateOrden) {
  if (!data.id) return stateUpdateError;

  try {
    await db
      .update(orden)
      .set(data.values)
      .where(eq(orden.id, Number(data.id)));

    revalidatePath('/ordenes');
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

type OrdenReturning = { id: number };

interface CreateOrdenFromSelectedRows {
  values: OrdenFormType;
  selectedRows: OrdenDetalleFormType[];
}

export async function createOrdenFromSelectedRows(
  prevState: unknown,
  data: CreateOrdenFromSelectedRows
) {
  let returningOrden: OrdenReturning;
  try {
    [returningOrden] = await db.insert(orden).values(data.values).returning({
      id: orden.id,
    });

    await createOrdenDetalleBySelectedRows(
      data.selectedRows,
      returningOrden.id
    );

    revalidatePath('/ordenes');
    return { ...stateUpdateSuccess, returningId: returningOrden.id };
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
