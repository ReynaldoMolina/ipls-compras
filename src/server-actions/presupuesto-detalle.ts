'use server';

import { db } from '@/database/db';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { PresupuestoDetalleFormType } from '@/types/types';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

interface CreatePresupuestoDetalle {
  values: PresupuestoDetalleFormType;
  id_presupuesto: number | string | undefined;
}

export async function createPresupuestoDetalle(
  prevState: unknown,
  data: CreatePresupuestoDetalle
) {
  if (!data.values) {
    return { success: false, message: 'Faltan datos por ingresar.' };
  }

  try {
    await db.insert(presupuesto_detalle).values(data.values);

    revalidatePath(`/presupuestos/${data.id_presupuesto}`);
    return stateCreateSuccess;
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdatePresupuestoDetalle {
  id: number | string | undefined;
  values: PresupuestoDetalleFormType;
  id_presupuesto: number | string | undefined;
}

export async function updatePresupuestoDetalle(
  prevState: unknown,
  data: UpdatePresupuestoDetalle
) {
  if (!data.id) return;

  try {
    await db
      .update(presupuesto_detalle)
      .set(data.values)
      .where(eq(presupuesto_detalle.id, Number(data.id)));

    revalidatePath(`/presupuestos/${data.id_presupuesto}`);
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

export type SolicitudDetalleColumn =
  keyof typeof presupuesto_detalle.$inferInsert;

export async function updatePresupuestoDetalleColumnByIds(
  ids: number[],
  column: SolicitudDetalleColumn,
  value: number | string
) {
  if (ids?.length === 0) return;

  try {
    await db
      .update(presupuesto_detalle)
      .set({ [column]: value })
      .where(inArray(presupuesto_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deletePresupuestoDetalleByIds(
  ids: number[],
  id_solicitud?: number
) {
  if (ids?.length === 0 || !id_solicitud) return;

  try {
    await db
      .delete(presupuesto_detalle)
      .where(inArray(presupuesto_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }
  revalidatePath(`/solicitudes/${id_solicitud}/detalle`);
}
