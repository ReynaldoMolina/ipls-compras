'use server';

import { db } from '@/database/db';
import { ordenes_detalle } from '@/database/schema/ordenes-detalle';
import { OrdenesModal } from '@/types/types';
import { redirect } from 'next/navigation';

export async function createOrdenDetalleBySelectedIds(
  selectedRowsIds: number[],
  orden: {
    id: number;
    id_solicitud: number;
  }
) {
  if (!orden) return;

  try {
    const data = selectedRowsIds.map((id_solicitud_detalle) => ({
      id_orden: orden.id,
      id_solicitud_detalle,
      cantidad: 0,
      precio_real: 0,
      observaciones: '',
    }));

    await db.insert(ordenes_detalle).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando el detalle de la orden');
  }
}

export async function addToExistingOrdenDetalleBySelectedIds(
  selectedRowsIds: number[],
  orden: OrdenesModal
) {
  if (!orden) return;

  try {
    const data = selectedRowsIds.map((id_solicitud_detalle) => ({
      id_orden: orden.id,
      id_solicitud_detalle,
      cantidad: 0,
      precio_real: 0,
      observaciones: '',
    }));

    await db.insert(ordenes_detalle).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando el detalle de la orden');
  }

  redirect(`/solicitudes/${orden.id_solicitud}/ordenes/${orden.id}/detalle`);
}

// export async function updateOrdenDetalleById(
//   id_orden: number | undefined,
//   data: OrdenFormType
// ) {
//   if (!id) return;
//   try {
//     await db.update(ordenes).set(data).where(eq(ordenes.id, id));
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
//   await goBackTo('/ordenes');
// }

// export async function deleteOrdenDetalleByIds(
//   ids: number[],
//   id_solicitud?: number
// ) {
//   if (ids?.length === 0 || !id_solicitud) return;

//   try {
//     await db
//       .delete(solicitudes_detalle)
//       .where(inArray(solicitudes_detalle.id, ids));
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
//   revalidatePath(`/solicitudes/${id_solicitud}/detalle`);
// }
