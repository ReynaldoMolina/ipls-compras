'use server';

import { db } from '@/database/db';
import { OrdenFormType } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { orden } from '@/database/schema/orden';
import { createOrdenDetalleBySelectedIds } from './orden-detalle';
import { redirect } from 'next/navigation';

export async function createOrden(data: OrdenFormType) {
  try {
    await db.insert(orden).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando la orden');
  }
  await goBackTo('/orden');
}

export async function updateOrden(id: number | undefined, data: OrdenFormType) {
  if (!id) return;
  try {
    await db.update(orden).set(data).where(eq(orden.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/orden');
}

type OrdenReturning = { id: number; id_solicitud: number };

export async function createOrdenFromSelectedIds(
  data: OrdenFormType,
  selectedRowsIds: number[]
) {
  let returningOrden: OrdenReturning;
  try {
    [returningOrden] = await db
      .insert(orden)
      .values(data)
      .returning({ id: orden.id, id_solicitud: orden.id_solicitud });
    await createOrdenDetalleBySelectedIds(selectedRowsIds, returningOrden);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando la orden');
  }
  redirect(
    `/solicitudes/${returningOrden.id_solicitud}/ordenes/${returningOrden.id}/detalle`
  );
}
