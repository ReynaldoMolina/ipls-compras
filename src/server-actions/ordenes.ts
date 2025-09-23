'use server';

import { db } from '@/database/db';
import { OrdenFormType } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { ordenes } from '@/database/schema/ordenes';
import { createOrdenDetalleBySelectedIds } from './ordenes-detalle';
import { redirect } from 'next/navigation';

export async function createOrden(
  // prevState: PrevState | undefined,
  data: OrdenFormType
) {
  try {
    await db.insert(ordenes).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando la orden');
  }
  await goBackTo('/ordenes');
}

export async function updateOrden(
  id: number | undefined,
  // prevState: PrevState,
  data: OrdenFormType
) {
  if (!id) return;
  try {
    await db.update(ordenes).set(data).where(eq(ordenes.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/ordenes');
}

type OrdenReturning = { id: number; id_solicitud: number };

export async function createOrdenFromSelectedIds(
  data: OrdenFormType,
  selectedRowsIds: number[]
) {
  let orden: OrdenReturning[];
  try {
    orden = await db
      .insert(ordenes)
      .values(data)
      .returning({ id: ordenes.id, id_solicitud: ordenes.id_solicitud });
    await createOrdenDetalleBySelectedIds(selectedRowsIds, orden[0]);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando la orden');
  }
  redirect(
    `/solicitudes/${orden[0].id_solicitud}/ordenes/${orden[0].id}/detalle`
  );
}
