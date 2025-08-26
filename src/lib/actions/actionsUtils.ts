'use server';

import { db } from '@/db/db';
import { Provider } from '@/types/types';
import { Table } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function goBackTo(path: string) {
  revalidatePath(path);
  redirect(path);
}

interface CreateProps<T extends Table> {
  table: T;
  data: any;
}

// export async function createRecord<T extends Table>({
//   table,
//   data,
// }: CreateProps<T>) {
//   try {
//     const result = await db.insert(table).values(data);
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'No se pudo actualizar el registro, por favor intenta de nuevo.'
//     );
//   }
// }

// interface UpdateProps extends CreateProps {
//   id: number;
// }

// export async function updateRecord({ table, data, id }: UpdateProps) {
//   const columns = Object.keys(data) as (keyof Provider)[];

//   try {
//     await sql`
//       update ${sql(table)}
//       set ${sql(data, columns)}
//       where "id" = ${id}
//     `;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'No se pudo actualizar el registro, por favor intenta de nuevo.'
//     );
//   }
// }

// export async function createRecordDetail({
//   tableName,
//   foreignKeyName,
//   foreignKeyValue,
//   columns,
//   productList,
// }) {
//   try {
//     await Promise.all(
//       productList.map((product) => {
//         const productWithRecordId = {
//           [foreignKeyName]: foreignKeyValue,
//           ...product,
//         };
//         return sql`
//         INSERT INTO ${sql(tableName)}
//         ${sql(productWithRecordId, columns)}
//       `;
//       })
//     );
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'No se pudo crear el detalle del registro, por favor intenta de nuevo.'
//     );
//   }
// }

// export async function updateDetailRecords({
//   foreignKeyName,
//   foreignKeyValue,
//   tableName,
//   productList,
//   originalList,
//   columns,
//   updateColumns,
// }) {
//   const updates = [];
//   const deletions = [];
//   const creations = [];
//   const changedPrice = updateColumns[1];

//   // Check modifications and deletions
//   originalList.forEach((original) => {
//     const updated = productList.find((item) => item.Id === original.Id);

//     if (!updated) {
//       deletions.push(original.Id);
//     } else if (
//       updated.Cantidad !== original.Cantidad ||
//       updated[changedPrice] !== original[changedPrice]
//     ) {
//       updates.push(updated);
//     }
//   });

//   // Check new records
//   productList.forEach((item) => {
//     if (!item.Id) {
//       const newItem = {
//         [foreignKeyName]: foreignKeyValue,
//         ...item,
//       };
//       creations.push(newItem);
//     }
//   });

//   try {
//     await Promise.all([
//       // Update
//       ...updates.map(
//         (item) =>
//           sql`
//           UPDATE ${sql(tableName)}
//           SET ${sql(item, updateColumns)}
//           WHERE "Id" = ${item.Id}
//         `
//       ),

//       // Delete
//       ...deletions.map(
//         (id) =>
//           sql`
//           DELETE FROM ${sql(tableName)}
//           WHERE "Id" = ${id}
//         `
//       ),

//       // Insert
//       ...creations.map((item) => {
//         return sql`
//           INSERT INTO ${sql(tableName)}
//           ${sql(item, columns)}
//         `;
//       }),
//     ]);
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'No se pudieron actualizar los detalles del registro, por favor intenta de nuevo.'
//     );
//   }
// }
