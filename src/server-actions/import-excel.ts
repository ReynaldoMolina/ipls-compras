'use server';

import { db } from '@/database/db';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { PresupuestoDetalleFormType } from '@/types/types';
import { revalidatePath } from 'next/cache';
import * as XLSX from 'xlsx';

export async function importExcel(formData: FormData, id_presupuesto: number) {
  const file = formData.get('file') as File | null;
  if (!file) throw new Error('No file uploaded');

  // Read Excel file as ArrayBuffer
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });

  // Pick first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const rows = XLSX.utils.sheet_to_json<PresupuestoDetalleFormType>(worksheet, {
    raw: false,
    dateNF: 'yyyy-mm-dd',
  });

  // Insert into database
  await db.insert(presupuesto_detalle).values(
    rows.map((row) => ({
      id_presupuesto: id_presupuesto,
      producto_servicio: row.producto_servicio,
      cantidad: row.cantidad,
      unidad_medida: row.unidad_medida,
      precio_sugerido: row.precio_sugerido,
      categoria: row.categoria,
      prioridad: row.prioridad,
      observacion: row.observacion,
    }))
  );

  revalidatePath('/');

  console.log(rows);

  return { success: true, count: rows.length };
}
