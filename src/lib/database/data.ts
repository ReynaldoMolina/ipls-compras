import { sql } from './db';

export async function getProviders() {
  try {
    const data = await sql`
      SELECT
        "id",
        "nombre_comercial",
        "razon_social",
        "ruc",
        "departamento",
        "telefono",
        "correo"
      FROM "proveedores"
      ORDER BY "id" DESC
    `;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los proveedores, por favor intenta de nuevo.'
    );
  }
}
