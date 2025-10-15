'use server';

import { db } from '@/database/db';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { PresupuestoDetalleFormType } from '@/types/types';
import {
  stateCreateError,
  stateCreateSuccess,
  stateDeleteError,
  stateDeleteSuccess,
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

export async function deletePresupuestoDetalleByIds(ids: number[]) {
  if (ids?.length === 0) return stateDeleteError;

  try {
    await db
      .delete(presupuesto_detalle)
      .where(inArray(presupuesto_detalle.id, ids));

    return stateDeleteSuccess;
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}
